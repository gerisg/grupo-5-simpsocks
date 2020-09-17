'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('variants', [
      { name: "sock-type", display: "tipo" },
      { name: "sock-size", display: "talle" }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('variants', null, {});
  }
};
