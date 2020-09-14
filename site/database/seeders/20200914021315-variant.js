'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('variants', [
      {
        name: "sock-type"
      },
      {
        name: "sock-size"
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('variants', null, {});
  }
};
