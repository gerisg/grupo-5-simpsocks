'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('variant_values', [
      {
        name: "Soquete",
        variant_id: 1 
      },
      {
        name: "Media Larga",
        variant_id: 1
      },
      {
        name: "Bucanera",
        variant_id: 1
      },
      {
        name: "Pequeño",
        variant_id: 2
      },
      {
        name: "Mediano",
        variant_id: 2
      },
      {
        name: "Grande",
        variant_id: 2
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('variant_values', null, {});
  }
};
