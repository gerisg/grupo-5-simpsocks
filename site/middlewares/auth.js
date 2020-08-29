const jsonTable = require('../database/jsonTable');
const usersModel = jsonTable('users');
const usersTokensModel = jsonTable('usersTokens');

module.exports = (req, res, next) => {
    let user = req.session.user;
    let utCookie = req.cookies.userToken;
    if(user) {
        res.locals.user = user;
    } else if (utCookie) {
        let userToken = usersTokensModel.findOne('token', utCookie);
        if (userToken) {
            let user = usersModel.findByPK(userToken.userId);
            if (user) {
                let userSession = { id: user.id, name: user.firstname, category: user.category };
                req.session.user = userSession; // Available in session
                res.locals.user = userSession; // Available in views
                console.log('User loaded from cookie');
            }
        }
    }
    next();
};