const sender = require('../../tools/sender');
const { fn, col } = require('sequelize');
const { product, image, category, variant_value, sku } = require('../../database/models');

module.exports = {
    list: async (req, res) => {
        try {
            let result = await product.findAndCountAll({
                include: [ 
                    { model: image, attributes: ['id', 'name', [fn('concat', `${req.protocol}://${req.get('host')}/images/products/`, col('images.name')), 'url']]},
                    { model: category, through: { attributes: [] }, attributes: { exclude: ['parent_id'] }}
                ]
            });
            sender.OK(req, res, result);
        } catch (error) {
            sender.Error(req, res, error.message);
        }
    },
    detail: async (req,res) => {
        try {
            let data = await product.findByPk(Number(req.params.id), { 
                include: [
                    { model: image, attributes: ['id', 'name', [fn('concat', `${req.protocol}://${req.get('host')}/images/products/`, col('images.name')), 'url']] },
                    { model: category, through: { attributes: [] }},
                    { model: sku, include: { model: variant_value, as: 'properties', through: { attributes: [] }}}
                ]
            });
            sender.OK(req, res, data);
        } catch (error) {
            sender.Error(req, res, error.message);
        }
    },
    latest: async (req, res) => {
        try {
            let data = await product.findAll({
                limit: 1,
                include: [
                    { model: image, attributes: ['id', 'name', [fn('concat', `${req.protocol}://${req.get('host')}/images/products/`, col('images.name')), 'url']] },
                    { model: category, through: { attributes: [] }},
                    { model: sku, include: { model: variant_value, as: 'properties', through: { attributes: [] }}}
                ],
                order: [['created_at', 'DESC']]
            });
            sender.OK(req, res, data);
        } catch (error) {
            sender.Error(req, res, error.message);
        }
    }
};