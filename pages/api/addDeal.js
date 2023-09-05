/* eslint-disable no-console, no-param-reassign, no-await-in-loop */
import axios from 'axios';
import path from 'path';
import formidable from 'formidable';
import fs from 'fs';
import sendEmail from '../../email/sendEmail';
import { contactEmail, projectEmail } from '../../email/templates';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  const proj = {};
  const form = formidable({});
  let fields;
  let files;

  try {
    [fields, files] = await form.parse(req);
  } catch (err) {
    console.error('Error1: ', err);
  }

  Object.keys(fields).forEach((key) => {
    [fields[key]] = fields[key];
  });

  Object.keys(files).forEach((key) => {
    [files[key]] = files[key];
  });

  const { dealname, description, email, firm, firstname, lastname, phase, phone, type } = fields;

  try {
    proj.deal = await axios.post(
      'https://api.hubapi.com/crm/v3/objects/deals',
      {
        properties: {
          dealname,
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
    proj.deal = proj.deal.data;
  } catch (err) {
    console.error('Deal Error: ', err);
  }

  try {
    proj.contact = await axios.post(
      'https://api.hubapi.com/crm/v3/objects/contacts',
      {
        properties: {
          email,
          firstname,
          hubspot_owner_id: process.env.DEFAULT_OWNER,
          lastname,
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
    proj.contact = proj.contact.data;
  } catch (err) {
    if (err.response.status === 409) {
      proj.contact = { id: err.response.data.message.replace(/\D/g, '') };
    } else {
      console.error('Contact Error: ', err);
    }
  }

  try {
    await axios.put(
      `https://api.hubapi.com/crm/v4/objects/contact/${proj.contact.id}/associations/deal/${proj.deal.id}`,
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
      proj.firm = await axios.post(
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
      proj.firm = proj.firm.data;
    } catch (err) {
      console.error('Firm Error: ', err);
    }

    try {
      await axios.put(
        `https://api.hubapi.com/crm/v4/objects/company/${proj.firm.id}/associations/deal/${proj.deal.id}`,
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
  }

  if (files) {
    try {
      proj.folder = await axios.post(
        'https://api.hubapi.com/files/v3/folders',
        {
          name: dealname,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.HUBSPOT_KEY}`,
            'Content-Type': 'application/json',
          },
        },
      );
      proj.folder = proj.folder.data;
    } catch (err) {
      console.error('Folder Error: ', err);
    }

    try {
      proj.files = [];
      /* eslint-disable-next-line guard-for-in, no-restricted-syntax */
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
        tempForm.append('folderId', proj.folder.id);
        tempForm.append('fileName', files[key].originalFilename);
        tempForm.append('options', JSON.stringify({ access: 'PRIVATE' }));

        const temp = await axios.post('https://api.hubapi.com/files/v3/files', tempForm, {
          headers: {
            Authorization: `Bearer ${process.env.HUBSPOT_KEY}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        proj.files.push(temp.data);
      }
    } catch (err) {
      console.error('File Error: ', err);
    }

    try {
      await axios.post(
        'https://api.hubapi.com/crm/v3/objects/notes/batch/create',
        {
          inputs: proj.files.map((f) => ({
            associations: [
              {
                to: {
                  id: proj.deal.id,
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
              hs_note_body: f.name,
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

  const name = firstname.concat(' ', lastname);
  const [phoneNumber, projectAddress, projectType, projectPhase] = [phone, dealname, type, phase];
  const attachments = [];

  Object.values(files).forEach((fi) => {
    attachments.push({
      filename: fi.originalFilename,
      path: path.resolve(__dirname, fi.filepath),
    });
  });

  const contactEmailOpts = contactEmail(email);
  const msgOpts = projectEmail({
    attachments,
    description,
    email,
    name,
    phoneNumber,
    projectAddress,
    projectPhase,
    projectType,
  });
  await sendEmail(contactEmailOpts);
  await sendEmail(msgOpts);

  Object.values(files).forEach((f) => {
    const filePath = path.resolve(__dirname, f.filepath);
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error('Error deleting file: ', err);
      }
    });
  });

  res.status(200).send('Completed');
};
