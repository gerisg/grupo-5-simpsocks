const sender = require('../../tools/sender');
const { category } = require('../../database/models');

module.exports = {
    list: async (req, res) => {
        try {
            let result  = await category.findAndCountAll({
                include: [{ 
                    model: category, 
                    as: 'parent', 
                    attributes: ['id', 'name']
                }],
                attributes: { exclude: ['parent_id'] }
            });
            sender.OK(req, res, result);
        } catch (error) {
            sender.Error(req, res, error.message);
        }
    }
};