/* eslint-disable guard-for-in, no-await-in-loop, no-restricted-syntax, no-console */
import formidable from 'formidable';
import axios from 'axios';
import fs from 'fs';
import sendEmail from '../../email/sendEmail';
import { contactEmail, projectEmail } from '../../email/templates';

export const config = {
  api: {
    bodyParser: false,
  },
};

const addDeal = async (req, res) => {
  const form = formidable({ multiples: true });
  let fields;
  let files;
  const project = {};
  try {
    [fields, files] = await form.parse(req);
  } catch (e) {
    console.log(e);
    res.status(500).send();
    return;
  }
  for (const key in files) {
    [files[key]] = files[key];
  }

  const {
    address: [address],
    description: [description],
    email: [email],
    firm: [firm],
    firstName: [firstName],
    lastName: [lastName],
    phone: [phone],
    projectPhase: [projectPhase],
    projectType: [projectType],
    token: [token],
  } = fields;
  let recaptchaData;
  try {
    recaptchaData = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      body: `secret=${process.env.RECAPTCHA_KEY}&response=${token}`,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      method: 'POST',
    }).then((resp) => resp.json());
  } catch (e) {
    console.log(e);
    res.status(500).send();
    return;
  }
  if (!recaptchaData.success && recaptchaData.score < 0.5) {
    res.status(400).send('Bot detected');
    return;
  }
  try {
    console.log(address, process.env.DEFAULT_OWNER, process.env.HUBSPOT_KEY);
    const deal = await axios.post(
      'https://api.hubapi.com/crm/v3/objects/deals',
      {
        properties: {
          dealname: address,
          dealstage: 'appointmentscheduled',
          hubspot_owner_id: process.env.DEFAULT_OWNER,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUBSPOT_KEY}`,
          'Content-Type': 'application/json',
        },
      },
    );
    project.deal = deal.data;
  } catch (err) {
    console.error('Deal Error: ', err);
  }

  try {
    const contact = await axios.post(
      'https://api.hubapi.com/crm/v3/objects/contacts',
      {
        properties: {
          email,
          firstname: firstName,
          hubspot_owner_id: process.env.DEFAULT_OWNER,
          lastname: lastName,
          phone,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUBSPOT_KEY}`,
          'Content-Type': 'application/json',
        },
      },
    );
    project.contact = contact.data;
  } catch (err) {
    if (err.response.status === 409) {
      project.contact = { id: err.response.data.message.replace(/\D/g, '') };
    } else {
      console.error('Contact Error: ', err);
    }
  }

  try {
    await axios.put(
      `https://api.hubapi.com/crm/v4/objects/contact/${project.contact.id}/associations/deal/${project.deal.id}`,
      [
        {
          associationCategory: 'HUBSPOT_DEFINED',
          associationTypeId: 4,
        },
      ],
      {
        headers: {
          Authorization: `Bearer ${process.env.HUBSPOT_KEY}`,
          'Content-Type': 'application/json',
        },
      },
    );
  } catch (err) {
    console.error('Contact Association Error: ', err);
  }

  if (firm) {
    try {
      const company = await axios.post(
        'https://api.hubapi.com/crm/v3/objects/companies',
        {
          properties: {
            name: firm,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.HUBSPOT_KEY}`,
            'Content-Type': 'application/json',
          },
        },
      );
      project.firm = company.data;
    } catch (err) {
      console.error('Firm Error: ', err);
    }
  }

  try {
    await axios.put(
      `https://api.hubapi.com/crm/v4/objects/company/${project.firm.id}/associations/deal/${project.deal.id}`,
      [
        {
          associationCategory: 'HUBSPOT_DEFINED',
          associationTypeId: 342,
        },
      ],
      {
        headers: {
          Authorization: `Bearer ${process.env.HUBSPOT_KEY}`,
          'Content-Type': 'application/json',
        },
      },
    );
  } catch (err) {
    console.error('Firm Association Error: ', err);
  }
  if (files) {
    try {
      const folder = await axios.post(
        'https://api.hubapi.com/files/v3/folders',
        {
          name: address,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.HUBSPOT_KEY}`,
            'Content-Type': 'application/json',
          },
        },
      );
      project.folder = folder.data;
    } catch (err) {
      console.error('Folder Error: ', err);
    }
    const attachmentFiles = [];
    try {
      for (const key in files) {
        const fileBuffer = fs.readFileSync(files[key].filepath);
        const fileBlob = new Blob([fileBuffer], { type: files[key].mimetype });
        const tempForm = new FormData();
        tempForm.append('file', fileBlob, {
          filename: files[key].originalFilename,
        });
        tempForm.append('folderId', project.folder.id);
        tempForm.append('fileName', files[key].originalFilename);
        tempForm.append('options', JSON.stringify({ access: 'PRIVATE' }));

        const temp = await axios.post('https://api.hubapi.com/files/v3/files', tempForm, {
          headers: {
            Authorization: `Bearer ${process.env.HUBSPOT_KEY}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        attachmentFiles.push(temp.data);
      }
    } catch (err) {
      console.error('File Error: ', err);
    }

    try {
      await axios.post(
        'https://api.hubapi.com/crm/v3/objects/notes/batch/create',
        {
          inputs: attachmentFiles.map((f) => ({
            associations: [
              {
                to: {
                  id: project.deal.id,
                },
                types: [
                  {
                    associationCategory: 'HUBSPOT_DEFINED',
                    associationTypeId: 214,
                  },
                ],
              },
            ],
            properties: {
              hs_attachment_ids: f.id,
              hs_note_body: f.id,
              hs_timestamp: Date.now(),
              hubspot_owner_id: process.env.DEFAULT_OWNER,
            },
          })),
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.HUBSPOT_KEY}`,
            'Content-Type': 'application/json',
          },
        },
      );
    } catch (err) {
      console.error('Note Error: ', err);
    }
  }

  const name = `${firstName} ${lastName}`;

  const contactEmailOpts = contactEmail(email);
  const msgOpts = projectEmail({
    description,
    email,
    name,
    phoneNumber: phone,
    projectAddress: address,
    projectPhase,
    projectType,
  });

  await sendEmail(contactEmailOpts);
  await sendEmail(msgOpts);
  res.status(200).send();
};

export default addDeal;
