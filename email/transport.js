import nodemailer from 'nodemailer';
import mg from 'nodemailer-mailgun-transport';

const auth = {
  auth: {
    api_key: process.env.MG_API_KEY,
    domain: 'mg.nolajs.com',
  },
};

export default nodemailer.createTransport(mg(auth));
