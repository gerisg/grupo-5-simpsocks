// rutas públicas envío al usuario a la home xq no tiene que estar en esta ruta
module.exports = (req, res, next) => {
 if(req.session.user) {
    return res.redirect('/')
 }
 next();
};
