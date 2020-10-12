const create = require('../../tools/creator');
const { user, role, address } = require('../../database/models');

module.exports = {
    list: async (req, res) => {
        try {
            let data = await user.findAll({ 
                include: { model: role, attributes: ['name'] }, 
                attributes: { exclude: ['password', 'role_id'] }
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
            let data = await user.findByPk(Number(req.params.id), { 
                include: [
                    { model: role, attributes: ['name'] },
                    { model: address, attributes: { exclude: ['user_id'] }}
                ],
                attributes: { exclude: ['password', 'role_id'] },
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