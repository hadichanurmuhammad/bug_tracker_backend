import nodemailer from 'nodemailer'
import config from '../config.js'

const transponter = nodemailer.createTransport({
    host: 'smtp.mail.ru',
    port: 465,
    secure: true, //true for 465, false for other ports
    auth: {
        user: config.EMAIL,
        pass: config.PASSWORD
    }
},
{
    from: `Bug tracker <${config.EMAIL}>`
})

const mailer = message => {
    transponter.sendMail(message, (err, info) => {
        if (err) return console.log(err);
        console.log(`Email sent: `, info);
    })
}

export default mailer