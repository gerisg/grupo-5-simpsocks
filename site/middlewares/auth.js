const jsonTable = require('../database/jsonTable');
const usersModels = jsonTable('users');

module.exports = (req,res,next) => {
    if (req.session.user) {
        //se lo paso a la vista
        res.locals.user = req.session.user;
        // o si tiene la check a cookie remember
    } else if (req.cookies.userEmail) {
        let user = usersModel.findByField('email', req.cookies.userEmail);

        if (user){ // si hay un ser borro la psw
            delete user.password; 

            req.session.user = user; //se lo envio a la session 
            res.locals.user = user; // se lo envio a la vista
        }
    }
    next();
};