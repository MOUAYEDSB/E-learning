const nodemailer = require('nodemailer');

// Create a transporter using the SMTP settings from .env
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_PORT === '465', // Use secure for port 465, otherwise false
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendPasswordEmail = async (to, password, role, children = []) => {
  let childrenDetails = '';
  if (role === 'Parent' && children.length > 0) {
    childrenDetails = '<p>Child accounts created:</p><ul>';
    children.forEach(child => {
      const displayPassword = child.motdepasse === 'Existing' ? 'Existing' : child.motdepasse;
      childrenDetails += `<li>Email: ${child.email}, Password: ${displayPassword}</li>`;
    });
    childrenDetails += '</ul>';
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: to,
    subject: 'Your Account Credentials',
    html: `
      <p>Dear ${role},</p>
      <p>Welcome to our service. Below are your account details:</p>
      <p><strong>Email:</strong> ${to}</p>
      <p><strong>Password:</strong> ${password}</p>
      ${childrenDetails}
      <p>You can use these credentials to log in to your account. If you did not request this, please ignore this email or contact our support team.</p>
      <p>Best regards,<br/>The Team</p>
    `,
  };

  try {
    console.log('Sending email to:', to);
    console.log('Email content:', mailOptions.html);
    const info = await transporter.sendMail(mailOptions);
    console.log('Password email sent successfully. Message ID:', info.messageId);
  } catch (error) {
    console.error('Error sending password email:', error.message);
    throw new Error('Error sending password email');
  }
};

module.exports = { sendPasswordEmail };
