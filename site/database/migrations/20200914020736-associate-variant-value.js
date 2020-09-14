'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'variant_values', // name of Source table
      'variant_id', // name of the key we're adding 
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'variants', // name of Target table
          key: 'id', // key in Target table that we're referencing
        }
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn(
      'variant_values', // name of Source table
      'variant_id' // key we want to remove
    );
  }
};
