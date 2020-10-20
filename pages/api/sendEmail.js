import sendEmail from '../../email/sendEmail';
import { contactEmail, projectEmail } from '../../email/templates';

export default async (req, res) => {
  const { description, email, name, phoneNumber, projectAddress, projectType, token } = req.body;
  const resp = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    body: `secret=${process.env.RECAPTCHA_KEY}&response=${token}`,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    method: 'POST',
  });
  const recaptchaData = await resp.json();
  if (recaptchaData.success && recaptchaData.score >= 0.5) {
    const contactEmailOpts = contactEmail(email);
    const msgOpts = projectEmail({
      description,
      email,
      name,
      phoneNumber,
      projectAddress,
      projectType,
    });
    await sendEmail(contactEmailOpts);
    await sendEmail(msgOpts);
    res.status(200).send('Sent');
  } else {
    res.status(400).send('Bot detected');
  }
};
