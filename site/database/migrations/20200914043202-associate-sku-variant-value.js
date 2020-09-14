'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('skus_variant_values', {
      id: { type: Sequelize.INTEGER(11), allowNull: false, autoIncrement: true, primaryKey: true },
      sku_id: { type: Sequelize.INTEGER(11), allowNull: false,
        references: {
          model: 'skus',
          key: 'id'
        }
      },
      variant_value_id: { type: Sequelize.INTEGER(11), allowNull: false, 
        references: {
          model: 'variant_values',
          key: 'id'
        }
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('skus_variant_values');
  }
};