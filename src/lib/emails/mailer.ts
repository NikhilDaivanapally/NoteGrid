import { render } from "@react-email/render";
import nodemailer from "nodemailer";
import { ReactElement } from "react";

type SendMailArgs = {
  to: string;
  subject: string;
  react: ReactElement;
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // TLS
  auth: {
    user: process.env.SENDER_EMAIL,
    pass: process.env.APP_PASSWORD,
  },
});

export const sendEmail = async ({ to, subject, react }: SendMailArgs) => {
  try {
    const emailHtml = await render(react);
    const info = await transporter.sendMail({
      from: {
        name: "NoteGrid",
        address: process.env.SENDER_EMAIL!,
      },
      to,
      subject,
      html: emailHtml,
    });

    console.log("Message sent: %s", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Email send failed:", error);
  }
};
