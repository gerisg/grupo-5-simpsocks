var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail', auth: {
        user: 'simpsocks@gmail.com',
        pass: 'o9QLr?t>'
    }
});

module.exports = {
    sendWelcome: (to, password) => {
        let mailOptions = {
            from: 'simpsocks@gmail.com',
            to: to,
            subject: 'Bienvenido a SimpSocks',
            html: `<h1>¡Bienvenido a SimpSocks!</h1>
                <a href='http://simpsocks.com.ar'>Acceder a Simpsocks</a>
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
                <a href='http://simpsocks.com.ar'>Acceder a Simpsocks</a>
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