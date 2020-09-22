const nodemailer = require('nodemailer');
const pug = require('pug');
const juice = require('juice');
const htmlToText = require('html-to-text');
const util = require('util');
const emailConfig = require('../config/email');

let transporter = nodemailer.createTransport({
  host: emailConfig.host,
  port: emailConfig.port,
  secure: false, // true for 465, false for other ports
  auth: {
    user: emailConfig.user, // generated ethereal user
    pass: emailConfig.pass, // generated ethereal password
  },
});

//* fn que te genera texto en base a un html
const generateHTML = (file, options = {}) => {
  const html = pug.renderFile(`${__dirname}/../views/emails/${file}.pug`, options);
  return juice(html);
}


//_ creamos una fn para poder enviar correos personalizados
exports.sendMailToResetPassword = async (options) => {
  const html = generateHTML(options.file, options);
  const text = htmlToText.fromString(html);

  let mailOptions = {
    from: '"Up Task 👻" <no-reply@uptask.com>', // sender address
    to: options.user.email, // list of receivers
    subject: options.subject,
    text,
    html,
  };

  //_ convertimos la fn a asincrona ya que por defecto no lo soporta
  const sendEmail = util.promisify(transporter.sendMail, transporter);
  return sendEmail.call(transporter, mailOptions);
  
  // transporter.sendMail(mailOptions);
}
