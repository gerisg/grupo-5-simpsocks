'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'categories', // name of Source table
      'parent_id', // name of the key we're adding 
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'categories', // name of Target table
          key: 'id', // key in Target table that we're referencing
        }
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn(
      'categories', // name of Source table
      'parent_id' // key we want to remove
    );
  }
};
