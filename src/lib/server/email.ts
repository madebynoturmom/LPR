import nodemailer from 'nodemailer';

// Configure these with your email provider's SMTP settings
const transporter = nodemailer.createTransport({
  service: 'gmail', // or another provider
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

export async function sendEmail(to: string, subject: string, text: string) {
  const mailOptions = {
    from: process.env.SMTP_USER,
    to,
    subject,
    text
  };
  await transporter.sendMail(mailOptions);
}
