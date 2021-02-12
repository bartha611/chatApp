const nodemailer = require("nodemailer");
require("dotenv").config();

const sendMail = async (mailOptions) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "adambarth611@gmail.com",
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const info = await transporter.sendMail(mailOptions);
  return info;
};

module.exports = sendMail;
