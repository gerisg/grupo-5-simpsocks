const sender = require('../../tools/sender');
const { fn, col } = require('sequelize');
const { user, role, address } = require('../../database/models');

module.exports = {
    list: async (req, res) => {
        try {
            let result = await user.findAndCountAll({ 
                attributes: { 
                    exclude: ['password', 'role_id'], 
                    include: [[fn('concat', `${req.protocol}://${req.get('host')}/api/users/`, col('id')), 'detail']]
                }
            });
            sender.OK(req, res, result);
        } catch (error) {
            sender.Error(req, res, error.message);
        }
    },
    detail: async (req,res) => {
        try {
            let data = await user.findByPk(Number(req.params.id), { 
                include: [
                    { model: address, attributes: { exclude: ['user_id'] }}
                ],
                attributes: { 
                    exclude: ['password', 'role_id'], 
                    include: [[fn('concat', `${req.protocol}://${req.get('host')}/images/users/`, col('image')), 'image_url']]
                }
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
                attributes: { 
                    exclude: ['password', 'role_id'], 
                    include: [[fn('concat', `${req.protocol}://${req.get('host')}/images/users/`, col('image')), 'image_url']]
                },
                order: [['created_at', 'DESC']]
            });
            sender.OK(req, res, data);
        } catch (error) {
            console.log('error')
            sender.Error(req, res, error.message);
        }
    }
};