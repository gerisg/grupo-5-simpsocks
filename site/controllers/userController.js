module.exports = {
    login: (req,res) => (res.render('users/login')),
    register: (req,res) => (res.render('users/register')),
    recover: (req,res) => (res.render('users/recover'))
}