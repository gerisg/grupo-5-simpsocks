/** Agregar este middleware a las rutas que requieran una sesión de usuario de tipo administrador */
module.exports = (req, res, next) => {
    if (!req.session.user || req.session.user.category != 'admin') {
        return res.redirect('/');
    }
    next();
}