'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'tokens', // name of Source TABLE
      'user_id', // name of the key we're adding 
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users', // name of Target table
          key: 'id', // key in Target table that we're referencing
        }
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn(
      'tokens', // name of Source TABLE
      'user_id' // key we want to remove
    );
  }
};
