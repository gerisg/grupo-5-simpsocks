const create = require('../../tools/creator');
const { product, image, category, variant_value, sku } = require('../../database/models');

module.exports = {
    list: async (req, res) => {
        try {
            let data = await product.findAll({
                include: [ 
                    { model: image, attributes: ['id', 'name'] },
                    { model: category, through: { attributes: [] }, attributes: { exclude: ['parent_id'] }}
                ]
            });
            let response = create.OK(req);
            response.data = data;
            response.meta.count = data.length;
            res.json(response);
        } catch (error) {
            let response = create.Error(req);
            response.error = error.message;
            res.status(500).json(response);
        }
    },
    detail: async (req,res) => {
        try {
            let data = await product.findByPk(Number(req.params.id), { 
                include: [
                    { model: image, attributes: ['id', 'name'] },
                    { model: category, through: { attributes: [] }},
                    { model: sku, include: { model: variant_value, as: 'properties', through: { attributes: [] }}}
                ]
            });
            let response = create.OK(req);
            response.data = data;
            res.json(response);
        } catch (error) {
            let response = create.Error(req);
            response.error = error.message;
            res.status(500).json(response);
        }
    }
};