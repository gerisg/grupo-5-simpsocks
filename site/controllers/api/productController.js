const sender = require('../../tools/sender');
const { fn, col } = require('sequelize');
const { product, image, category, variant_value, sku } = require('../../database/models');

module.exports = {
    list: async (req, res) => {
        try {
            let result = await product.findAndCountAll({
                include: [{ model: category, through: { attributes: [] }, attributes: { exclude: ['parent_id'] }}],
                attributes: { 
                    exclude: ['discount', 'price', 'created_at'], 
                    include: [[fn('concat', `${req.protocol}://${req.get('host')}/api/products/`, col('product.id')), 'detail']]
                },
                group: ['categories.name']
            });
            sender.OK(req, res, result);
        } catch (error) {
            if(error.original.code == 'ER_WRONG_FIELD_WITH_GROUP') {
                // FIXME Buscar alternativas para hacerlo funcionar sin desactivar el modo estandar
                // https://stackoverflow.com/questions/35882816/how-to-disable-only-full-group-by-in-mysql-or-sequelize
                await product.sequelize.query(`SET SESSION sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''))`);
                return res.redirect('/api/products');
            }
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
    },
    stock: async (req, res) => {
        res.json({
            sku_id: 1,
            sku: '011221',
            stock: 10,
            detalle: 'Media Larga Pequeño',
        });
    }
};