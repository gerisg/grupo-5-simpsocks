const sender = require('../../tools/sender');
const { category } = require('../../database/models');

module.exports = {
    list: async (req, res) => {
        try {
            let data = await category.findAll({
                include: [{ 
                    model: category, 
                    as: 'parent', 
                    attributes: ['id', 'name']
                }],
                attributes: { exclude: ['parent_id'] }
            });
            sender.OK(req, res, data);
        } catch (error) {
            sender.Error(req, res, error.message);
        }
    }
};