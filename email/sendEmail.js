import transport from './transport';

const sendEmail = options =>
  new Promise((resolve, reject) =>
    transport.sendMail(options, (err, info) => {
      if (err) {
        reject(err);
      } else {
        resolve(info);
      }
    }),
  );

export default sendEmail;
