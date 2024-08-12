const transporter = require('../config/nodemailerConfig');

const sendPasswordEmail = async (email, password) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER, 
      to: email,
      subject: 'Your New Account Password', 
      text: `Your password is: ${password}`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log('Password email sent successfully');
  } catch (error) {
    console.error('Error sending password email:', error);
  }
};

module.exports = { sendPasswordEmail };
