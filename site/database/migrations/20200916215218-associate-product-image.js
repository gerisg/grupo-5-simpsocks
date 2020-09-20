'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'images', // name of Source table
      'product_id', // name of the key we're adding 
      {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'products', // name of Target table
          key: 'id', // key in Target table that we're referencing
        }
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn(
      'images', // name of Source table
      'product_id' // key we want to remove
    );
  }
};
