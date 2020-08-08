module.exports = {
    list: (req, res) => res.render('products/list'),
    detail: (req,res) => res.render('products/detail'),
    create: (req,res) => res.render('products/create'),
    edit: (req,res) => res.render('products/edit'),
    cart: (req,res) => res.render('products/cart')
};