import { createTransport } from 'nodemailer';

const config = useRuntimeConfig();

const transporter = createTransport({
  service: 'gmail',
  auth: {
    user: config.SENDER_EMAIL_ID,
    pass: config.SENDER_EMAIL_PWD
  }
})

/**
 * 
 * @param {object} options 
 * @requires receiver
 * @requires emailSubject | emailText
 * @returns null
 */

export const sendEmail = async ({ receiver, emailSubject, emailText }) => {
  try {
    if(!receiver) return Promise.reject('receiver required')
    if(!emailSubject || !emailText) return Promise.reject('subject or text required')

    const mailOptions = {
      from: config.SENDER_EMAIL_ID,
      to:  receiver,
      subject: emailSubject,
      text: emailText,
    }
  
    await transporter.sendMail(mailOptions);

  } catch (err) {
    throw err;
  }
}

