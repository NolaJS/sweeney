/* eslint-disable guard-for-in, no-await-in-loop, no-restricted-syntax, no-console */
import formidable from 'formidable';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import sendEmail from '../../email/sendEmail';
import { contactEmail, projectEmail } from '../../email/templates';

export const config = {
  api: {
    bodyParser: false,
  },
};

const addDeal = async (req, res) => {
  const form = formidable({ multiples: true });
  console.log('trying this');
  let fields;
  let files;
  const project = {};
  try {
    [fields, files] = await form.parse(req);
  } catch (err) {
    console.error('Form Error: ', err);
    res.status(500).send();
    return;
  }
  // Changes fields and files from { firstName: ["name"] } -> { firstName: "name" }
  for (const key in fields) {
    [fields[key]] = fields[key];
  }
  for (const key in files) {
    [files[key]] = files[key];
  }
  const {
    address,
    description,
    email,
    firm,
    firstName,
    lastName,
    phone,
    projectPhase,
    projectType,
    token,
  } = fields;
  let recaptchaData;
  try {
    recaptchaData = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      body: `secret=${process.env.RECAPTCHA_KEY}&response=${token}`,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      method: 'POST',
    }).then((resp) => resp.json());
  } catch (err) {
    console.error('Recaptcha Error: ', err);
    res.status(500).send();
    return;
  }
  if (!recaptchaData.success && recaptchaData.score < 0.5) {
    res.status(400).send('Bot detected');
    return;
  }
  try {
    const deal = await axios.post(
      'https://api.hubapi.com/crm/v3/objects/deals',
      {
        properties: {
          dealname: address,
          dealstage: '92486949',
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

    try {
      project.files = [];
      for (const key in files) {
        let fileBlob = await new Promise((resolve, reject) => {
          fs.readFile(path.resolve(__dirname, files[key].filepath), (err, data) => {
            if (err) {
              console.error(err);
              reject(err);
            } else {
              resolve(data);
            }
          });
        });

        fileBlob = new Blob([fileBlob], { type: files[key].mimetype });
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
        project.files.push(temp.data);
      }
    } catch (err) {
      console.error('File Error: ', err);
    }

    try {
      await axios.post(
        'https://api.hubapi.com/crm/v3/objects/notes/batch/create',
        {
          inputs: project.files.map((f) => ({
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
  const attachments = [];

  const contactEmailOpts = contactEmail(email);
  const msgOpts = projectEmail({
    attachments,
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

  for (const key in files) {
    const filePath = path.resolve(__dirname, files[key].filepath);
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error('Error deleting file: ', err);
      }
    });
  }

  res.status(200).send();
};

export default addDeal;
