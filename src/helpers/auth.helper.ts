import { google } from 'googleapis';
import nodemailer, { Transporter } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

const { OAuth2 } = google.auth;
/**
 *
 *
 * @private
 * @return {*} an instance of transporter
 * @memberof UserService
 */
export const createTransporter = async (): Promise<Transporter<SMTPTransport.SentMessageInfo>> => {
  const oauth2Client = new OAuth2(
    process.env.EMAIL_CLIENT_ID,
    process.env.EMAIL_CLIENT_SECRET,
    'https://developers.google.com/oauthplayground',
  );
  oauth2Client.setCredentials({
    refresh_token: process.env.GMAIL_CLIENT_REFRESH_TOKEN,
  });

  const accessToken: string = await new Promise((resolve, reject) => {
    oauth2Client.getAccessToken((err, token) => {
      if (err) {
        reject();
      }
      if (token) {
        resolve(token);
      }
    });
  });

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      type: 'OAuth2',
      user: 'excitedhchips@gmail.com',
      accessToken,
    },
  });

  return transporter;
};
