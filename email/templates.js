import getLayout from './getLayout';

const from = 'noreply@sweeneyrestoration.com';
const admins = ['devon@sweeneyrestoration.com'];

export const contactEmail = (to) => ({
  from,
  html: getLayout({
    content: `<p>Thank you for your interest! We will respond to your inquiry shortly.</p>`,
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
  projectPhase,
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
      Project Type: ${projectPhase}
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
