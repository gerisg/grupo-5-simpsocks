let { category, image, product } = require('../database/models');

module.exports = {
    index: async (req,res) => {
        try {
            let featuredCategory = await category.findOne({ where: { name: 'destacados' }});
            let featuredProducts = await product.findAll(
                { include: [
                    { model: image },
                    { model: category, where: { id: featuredCategory.id }}
                ]}
            );
            featuredProducts.forEach(prod => prod.offerPrice = prod.discount > 0 ? Math.round(prod.price * ((100 - prod.discount) / 100)) : prod.price);
            let topCategories = await category.findAll({ where: { top: 1 }});
            res.render('index', { featured: featuredProducts, topCategories } );
        } catch (error) {
            console.log(error);
            res.render('index');
        }
    }
}