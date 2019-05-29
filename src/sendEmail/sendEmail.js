const nodemailer = require("nodemailer");
const path = require('path');
const { getConfig } = require('../config');

async function sendEmail(email){
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: getConfig().user,
            pass: getConfig().pass
        }
    });

    const info = await transporter.sendMail({
        from: getConfig().user,
        to: email,
        subject: 'Рассылка анкеты ✔',
        html: '<b> Добрый день!</b>' +
            '<br>' +
            '<p>С уважением, Издательство Альтернатива</p>',
        attachments: [{
            filename: 'profile.pdf',
            path: path.join(__dirname, '../data', 'profile.pdf'),
            contentType: 'application/pdf'
        }],
    });

    return info;
}

module.exports = { sendEmail };
