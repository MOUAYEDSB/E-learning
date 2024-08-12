const nodemailer = require('nodemailer');

// Create a transporter using the SMTP settings from .env
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // True for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendPasswordEmail = async (to, password) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: to,
    subject: 'Your Password',
    text: `Your password is: ${password}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Password email sent successfully');
  } catch (error) {
    console.error('Error sending password email:', error);
    throw new Error('Error sending password email');
  }
};

module.exports = { sendPasswordEmail };
