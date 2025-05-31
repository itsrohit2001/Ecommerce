const nodemailer = require("nodemailer");

const sendMail = async (to, subject, htmlContent) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER, // your Gmail address
      pass: process.env.GMAIL_PASS, // your Gmail App Password
    },
  });

  // Define the email options
  const mailOptions = {
    from: `"E-commerce" <${process.env.GMAIL_USER}>`, // sender address
    to, // list of receivers
    subject, // Subject line
    html: htmlContent, // plain text body
  };

  // Send the email
  try {
    const res = await transporter.sendMail(mailOptions);
    console.log(res);
    return { success: true, message: "Email sent successfully" };
  } catch (error) {
    return { success: false, message: "Failed to send email", error };
  }
};

module.exports = { sendMail };
