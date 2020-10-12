const create = require('../../tools/creator');
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
            let response = create.OK(req);
            response.data = data;
            response.meta.count = data.length;
            res.json(response);
        } catch (error) {
            let response = create.Error(req);
            response.error = error.message;
            res.status(500).json(response);
        }
    }
};