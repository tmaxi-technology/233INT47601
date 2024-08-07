const nodemailer = require("nodemailer");

const sendMail = async (to, title, html) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_NAME, // generated ethereal user
      pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
    },
  });
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"B.N Shop" <no-replply@proecommerce.com>', // sender address
    to: to, // list of receivers
    subject: title, // Subject line
    html: html, // html body
  });
  return info;
};

module.exports = {
  sendMail: sendMail,
};
