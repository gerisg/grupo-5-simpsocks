module.exports = {
    list: (req, res) => res.render('products/list'),
    detail: (req,res) => res.render('products/productDetail'),
    create: (req,res) => res.render("products/create"),
    edit: (req,res) => res.render("products/edit"),
};