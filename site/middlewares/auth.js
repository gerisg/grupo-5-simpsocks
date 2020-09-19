let { user, token } = require('../database/models');

module.exports = (req, res, next) => {
    let sessionUser = req.session.user;
    let utCookie = req.cookies.userToken;
    if(sessionUser) {
        res.locals.auth = sessionUser; // Available in views
    } else if (utCookie) {
        let userToken = token.findOne({ where: { token: utCookie }});
        if (userToken) {
            let cookieUser = user.findByPk(userToken.userId);
            if (cookieUser) {
                let userSession = { id: cookieUser.id, name: cookieUser.firstname, category: cookieUser.category };
                req.session.user = userSession; // Available in session
                res.locals.auth = userSession; // Available in views
            }
        }
    }
    next();
};