'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('categories', [
      {
        name: "destacados",
        parent_id: null
      },
      {
        name: "personajes",
        parent_id: null
      },
      {
        name: "promociones",
        parent_id: null
      },
      {
        name: "homero",
        parent_id: 2
      },
      {
        name: "marge",
        parent_id: 2
      },
      {
        name: "bart",
        parent_id: 2
      },
      {
        name: "lisa",
        parent_id: 2
      },
      {
        name: "maggie",
        parent_id: 2
      },
      {
        name: "hotsale",
        parent_id: 3
      },
      {
        name: "descuentos",
        parent_id: 3
      },
      {
        name: "envios",
        parent_id: 3
      },
      {
        name: "2x1",
        parent_id: 3
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('categories', null, {});
  }
};
