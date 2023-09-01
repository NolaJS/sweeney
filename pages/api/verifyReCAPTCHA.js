export default async (req, res) => {
  const { token } = req.body;
  try {
    const resp = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      body: `secret=${process.env.RECAPTCHA_KEY}&response=${token}`,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      method: 'POST',
    });
    const recaptchaData = await resp.json();
    if (recaptchaData.success) {
      res.status(200).send('Passed');
    } else {
      res.status(400).send('Bot detected');
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    res.status(500).send('Server Error');
  }
};
