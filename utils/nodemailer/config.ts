import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

const transporter = nodemailer.createTransport({
  name: 'levelmatic',
  host: 'levelmatic.net',
  port: 465,
  secure: true,
  auth: {
    user: 'info@levelmatic.net',
    pass: 'Ronalt1.',
  },
});

export const emailConnection = async () => {
  try {
    await transporter.verify();
    console.log('conexión smtp online');
  } catch (error) {
    console.log(error);
  }
};

export const sendMail = async (message: Mail.Options) => {
  try {
    return await transporter.sendMail(message);
  } catch (error) {
    console.log(error);
  }
};
