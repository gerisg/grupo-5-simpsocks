'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('categories_products', {
      id: { type: Sequelize.INTEGER(11), allowNull: false, autoIncrement: true, primaryKey: true },
      category_id: { type: Sequelize.INTEGER(11), allowNull: false, 
        references: {
          model: 'categories',
          key: 'id',
        }
      },
      product_id: { type: Sequelize.INTEGER(11), allowNull: false, 
        references: {
          model: 'products',
          key: 'id',
        }
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('categories_products');
  }
};
