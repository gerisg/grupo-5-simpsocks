const jsonTable = require('../database/jsonTable');
const usersModels = jsonTable('users');
const usersTokensModels = jsonTable('usersTokens');

module.exports = (req,res,next) => {
    if (req.session.user) {
        //se lo paso a la vista
        res.locals.user = req.session.user;

        // o si tiene el check a cookie remember
    } else if (req.cookies.userToken) {
        let userToken = usersTokensModels.findByField('token', req.cookies.userToken) //busca por token lo que llega por cookies
        
        if (userToken && userToken.length > 0) {
            userToken = userToken[0]
            let user = usersModel.find(userToken.userId); //le paso el id x user del json

            if (user) { // si hay un ser borro la psw
                delete user.password; 
                req.session.user = user; //se lo envio a la session 
                res.locals.user = user; // se lo envio a la vista
            }
        }
    }
    next();
};