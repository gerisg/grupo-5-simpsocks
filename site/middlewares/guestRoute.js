/** Agregar este middleware a las rutas que sólo son accesibles SIN una sesión de usuario */
module.exports = (req, res, next) => {
    if (req.session.user) { 
        return res.redirect('/');
    }
    next();
}