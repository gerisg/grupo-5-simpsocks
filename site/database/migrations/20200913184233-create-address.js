'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('addresses', {
      id: { type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
      street: { type: Sequelize.STRING, allowNull: false },
      number: { type: Sequelize.INTEGER, allowNull: false },
      city: { type: Sequelize.STRING, allowNull: false },
      type: { type: Sequelize.STRING, allowNull: false }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('addresses');
  }
};