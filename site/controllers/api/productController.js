const sender = require('../../tools/sender');
const { fn, col, Op } = require('sequelize');
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
        // Get variants IDs
        let variantIDs = req.body.variantId.map(id => { return { variant_value_id: Number(id) }})
        // Find skus with variants
        let results = await sku.findAll({ 
            where: { product_id: req.body.prodId }, 
            include: { model: variant_value, as: 'properties', through: { where: { [Op.or]: variantIDs}}}
        });
        if(results && results.length) {
            // https://stackoverflow.com/questions/58556986/can-sequelize-filter-many-to-many-relationships
            // TODO Find a better query to avoid following 
            // Filter skus with all variants
            results = results.filter(r => {
                let idsToFilter = r.properties.reduce((ids, current) => { ids.push(current.id); return ids; }, []);
                return variantIDs.every((val, index) => val.variant_value_id === idsToFilter[index]);
            });
            if(results && results.length) {
                results = results[0];
                return res.json({
                    id: results.id,
                    sku: results.sku,
                    stock: results.stock,
                    product_id: results.product_id,
                    detail: results.properties.reduce((names, props) => `${names.trim()} ${props.name}`, '')
                });
            }
        }
        return res.status(404).json({ error: `Not available a product ID=${req.body.prodId} with properties IDs=[${req.body.variantId}]` });
    }
};