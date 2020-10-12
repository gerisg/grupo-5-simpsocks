const sender = require('../../tools/sender');
const { user, role, address } = require('../../database/models');

module.exports = {
    list: async (req, res) => {
        try {
            let data = await user.findAll({ 
                include: { model: role, attributes: ['name'] }, 
                attributes: { exclude: ['password', 'role_id'] }
            });
            sender.OK(req, res, data);
        } catch (error) {
            sender.Error(req, res, error.message);
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
            sender.OK(req, res, data);
        } catch (error) {
            sender.Error(req, res, error.message);
        }
    },
    latest: async (req,res) => {
        try {
            let data = await user.findAll({
                limit: 1,
                include: { model: role, attributes: ['name'] },
                attributes: { exclude: ['password', 'role_id'] },
                order: [['created_at', 'DESC']]
            });
            sender.OK(req, res, data);
        } catch (error) {
            console.log('error')
            sender.Error(req, res, error.message);
        }
    }
};