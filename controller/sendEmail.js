"use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
exports.sendEmail=async(req, res, next) => { 
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'neha.kautzer@ethereal.email',
        pass: 'upWAuQVjNwJG6pCgQK'
    }
});

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'ajaykumaresh96@gmail.com', // sender address
    to: "ajaykumaresh9@gmail.com", // list of receivers
    subject: "Admin User had Acknowledge Your Profile", // Subject line
    text: "Hello world?", // plain text body
  });
  if(info.messageId){
    console.log( JSON.stringify(info));
    return res.status(200).json({ msg: "Email had been sent" })
  }
 
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  return res.status(500).json({ msg: "bad Request" })

}

