'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('products_variants', {
      id: { type: Sequelize.INTEGER(11), allowNull: false, autoIncrement: true, primaryKey: true },
      product_id: { type: Sequelize.INTEGER(11), allowNull: false,
        references: {
          model: 'products',
          key: 'id'
        }
      },
      variant_id: { type: Sequelize.INTEGER(11), allowNull: false, 
        references: {
          model: 'variants',
          key: 'id'
        }
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('products_variants');
  }
};