/* eslint-disable guard-for-in, no-await-in-loop, no-restricted-syntax, no-console */
import formidable from 'formidable';
import axios from 'axios';
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
  const project = {};
  try {
    [fields] = await form.parse(req);
  } catch (e) {
    console.log(e);
    res.status(500).send();
    return;
  }

  const {
    address: [address],
    description: [description],
    email: [email],
    firm: [firm],
    firstName: [firstName],
    hasFiles: [hasFiles],
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
    await axios.post('https://api.hubapi.com/crm/v3/objects/notes', {
      associations: [
        {
          to: {
            id: project.deal.id,
          },
          types: [
            {
              associationCategory: 'HUBSPOT_DEFINED',
              associationTypeId: 213,
            },
          ],
        },
      ],
      properties: {
        hs_note_body: description,
        hubspot_owner_id: process.env.DEFAULT_OWNER,
      },
    });
  } catch (err) {
    console.error('Note Error: ', err);
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
  if (hasFiles === 'true') {
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
  } else {
    project.folder = {};
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

  res.status(200).json({ dealId: project.deal.id, folderId: project.folder.id });
};

export default addDeal;
