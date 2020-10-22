'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('categories', [
      { name: "destacados", top: 1, image: "originals.png", parent_id: null },
      { name: "personajes", top: 0, image: "", parent_id: null },
      { name: "promociones", top: 0, image: "", parent_id: null },
      { name: "homero", top: 1, image: "homero.png", parent_id: 2 },
      { name: "marge", top: 0, image: "", parent_id: 2 },
      { name: "bart", top: 1, image: "sockets.jpg", parent_id: 2 },
      { name: "lisa", top: 0, image: "", parent_id: 2 },
      { name: "maggie", top: 0, image: "", parent_id: 2 },
      { name: "hotsale", top: 1, image: "bucaneras.png", parent_id: 3 },
      { name: "descuentos", top: 0, image: "", parent_id: 3 },
      { name: "envios", top: 0, image: "", parent_id: 3 },
      { name: "2x1", top: 0, image: "", parent_id: 3 }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('categories', null, {});
  }
};
