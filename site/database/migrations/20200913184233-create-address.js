'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('addresses', {
      id: { type: Sequelize.INTEGER(11), allowNull: false, autoIncrement: true, primaryKey: true },
      street: { type: Sequelize.STRING(255), allowNull: false },
      number: { type: Sequelize.INTEGER(11), allowNull: false },
      city: { type: Sequelize.STRING(255), allowNull: false },
      type: { type: Sequelize.STRING(255), allowNull: false },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('addresses');
  }
};