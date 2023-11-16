import { createTransport } from "nodemailer";

const config = useRuntimeConfig();

const transporter = createTransport({
  service: "gmail",
  auth: {
    user: config.SENDER_EMAIL_ID,
    pass: config.SENDER_EMAIL_PWD,
  },
});

type sendEmailOptions = {
  receiver: string;
  emailSubject: string;
  emailText?: string;
  emailHTML?: string;
};
export async function sendEmail(options: sendEmailOptions) {
  try {
    if (!options?.receiver) return Promise.reject("receiver required");
    if (!options?.emailSubject) return Promise.reject("email subject required");
    if (!options?.emailText && !options?.emailHTML)
      return Promise.reject("email text or html required");

    await transporter.sendMail({
      from: config.SENDER_EMAIL_ID,
      to: options?.receiver,
      subject: options?.emailSubject,
      text: options?.emailText || "",
      html: options?.emailHTML || "",
    });
  } catch (err) {
    throw err;
  }
}
