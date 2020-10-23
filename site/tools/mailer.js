require('dotenv').config();

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    secureConnection: process.env.SMTP_SECURE,
    port: process.env.SMTP_PORT,
    auth: {
          user: process.env.SMTP_AUTH_USER,
          pass: process.env.SMTP_AUTH_PASS
    }
});

module.exports = {
    sendWelcome: (to, password) => {
        let mailOptions = {
            from: 'simpsocks@gmail.com',
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
            from: 'simpsocks@gmail.com',
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
            from: 'simpsocks@gmail.com',
            to: 'simpsocks@gmail.com',
            subject: 'Contacto Simpsocks',
            html: messageHTML
        };
        transporter.sendMail(mailOptions)
            .then((info) => console.log(info.response))
            .catch(error => console.log(error));
    }
}