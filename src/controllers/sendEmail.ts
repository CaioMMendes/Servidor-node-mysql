import nodemailer from "nodemailer";

export const sendEmail = async (
  email: any,
  subject: any,
  text: any,
  html: any
) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      service: process.env.EMAIL_SERVICE,
      port: Number(process.env.EMAIL_PORT),
      secure: Boolean(process.env.EMAIL_SECURE),
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      from: process.env.EMAIL_USER,
    });
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: subject,
      text: text,
      html,
    });
    console.log("Email sent successfully");
  } catch (error) {
    console.log("Email not send");
    console.log(error);
  }
};
