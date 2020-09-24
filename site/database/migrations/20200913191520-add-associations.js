'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'addresses', // name of Source table
      'user_id', // name of the key we're adding 
      {
        
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'users', // name of Target table
          key: 'id', // key in Target table that we're referencing
        }
      }
    );
    await queryInterface.addColumn(
      'users', // name of Source table
      'role_id', // name of the key we're adding 
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'roles', // name of Target table
          key: 'id', // key in Target table that we're referencing
        }
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn(
      'addresses', // name of Source table
      'user_id' // key we want to remove
    );
    await queryInterface.removeColumn(
      'users', // name of Source table
      'role_id' // key we want to remove
    );
  }
};
