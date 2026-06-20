import nodemailer from 'nodemailer';
import { config } from '../config.js';

let transporter: nodemailer.Transporter | null = null;

if (config.email.host && config.email.user && config.email.pass) {
  transporter = nodemailer.createTransport({
    host: config.email.host,
    port: config.email.port,
    secure: config.email.port === 465,
    auth: {
      user: config.email.user,
      pass: config.email.pass,
    },
  });
}

export async function sendEmail(to: string, subject: string, html: string): Promise<void> {
  if (!transporter) {
    console.log(`Email not configured. Would send to ${to}: ${subject}`);
    return;
  }
  await transporter.sendMail({
    from: `"Quiet Psychology" <${config.email.from}>`,
    to,
    subject,
    html,
  });
}

export async function sendDownloadConfirmation(email: string, downloadUrl: string, bookTitle: string): Promise<void> {
  await sendEmail(
    email,
    `Your download: ${bookTitle}`,
    `<p>Thank you for your purchase.</p><p>You can download <strong>${bookTitle}</strong> here: <a href="${downloadUrl}">${downloadUrl}</a></p>`
  );
}
