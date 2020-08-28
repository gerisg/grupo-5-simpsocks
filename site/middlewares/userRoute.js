module.exports = (req, res, next) => {
    if (!req.session.user){
        return res.redirect('users/login') // si la sesion no existe  redirect al login
    }
    next()
}