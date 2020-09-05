/** Agregar este middleware a las rutas que requieran una sesión de usuario */
module.exports = (req, res, next) => {
    if (!req.session.user) { 
        return res.redirect('/users/login');
    }
    next();
}