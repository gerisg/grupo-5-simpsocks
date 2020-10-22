require('dotenv').config();

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail', auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});

module.exports = {
    sendWelcome: (to, password) => {
        let mailOptions = {
            from: process.env.MAIL_USER,
            to: to,
            subject: 'Bienvenido a SimpSocks',
            html: `<h1>¡Bienvenido a SimpSocks!</h1>
                <a href='https://simpsocks.com.ar'>Acceder a Simpsocks</a>
                <p>Usuario: ${to}</p>
                <p>Contraseña: ${password}</p>`
        };
        transporter.sendMail(mailOptions)
            .then((info) => console.log(info.response))
            .catch(error => console.log(error));
    },
    sendRecover: (to, password) => {
        let mailOptions = {
            from: process.env.MAIL_USER,
            to: to,
            subject: 'SimpSocks Nueva Contraseña',
            html: `<h1>Solicitud de nueva contraseña</h1>
                <a href='https://simpsocks.com.ar'>Acceder a Simpsocks</a>
                <p>Usuario: ${to}</p>
                <p>Contraseña: ${password}</p>`
        };
        transporter.sendMail(mailOptions)
            .then((info) => console.log(info.response))
            .catch(error => console.log(error));
    },
    sendContactInfo: (messageHTML) => {
        let mailOptions = {
            from: process.env.MAIL_USER,
            to: process.env.MAIL_USER,
            subject: 'Contacto Simpsocks',
            html: messageHTML
        };
        transporter.sendMail(mailOptions)
            .then((info) => console.log(info.response))
            .catch(error => console.log(error));
    }
}