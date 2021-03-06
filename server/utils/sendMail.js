const sgMail = require("@sendgrid/mail");
require("dotenv").config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendMail = async (mailOptions) => {
  try {
    await sgMail.send(mailOptions);
    console.log("hello there");
    return true;
  } catch (err) {
    return err;
  }
};

module.exports = sendMail;
