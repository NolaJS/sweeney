import getLayout from './getLayout';

const from = 'noreply@sweeneyrestoration.com';
const admins = ['sscaff1@gmail.com'];

export const contactEmail = to => ({
  bcc: admins,
  from,
  html: getLayout({
    content: `<p>We will respond to inquiry shortly. Thank you again for your interest.</p>`,
    title: 'Sweeney Restoration - Thank you',
  }),
  subject: 'Thank you for contacting Sweeney Restoration',
  to,
});

export const projectEmail = ({
  description,
  email,
  name,
  phoneNumber,
  projectAddress,
  projectType,
}) => {
  const content = `
  <tr>
    <td class="content-block">
      Name: ${name}
    </td>
  </tr>
  <tr>
    <td class="content-block">
      Email: ${email}
    </td>
  </tr>
  <tr>
    <td class="content-block">
      Phone Number: ${phoneNumber}
    </td>
  </tr>
  <tr>
    <td class="content-block">
      Project Type: ${projectType}
    </td>
  </tr>
  <tr>
    <td class="content-block">
      Project Address: ${projectAddress}
    </td>
  </tr>
  <tr>
    <td class="content-block">
      Description: ${description}
    </td>
  </tr>  
  `;
  return {
    from,
    html: getLayout({ content, title: 'Sweeney Restoration - New Contact' }),
    subject: 'Sweeney Restoration - New Contact from Website',
    to: admins,
  };
};