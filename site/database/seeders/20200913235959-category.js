'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('categories', [
      { name: "destacados", top: 1, image: "featured.jpg", parent_id: null },
      { name: "personajes", top: 0, image: "", parent_id: null },
      { name: "promociones", top: 0, image: "", parent_id: null },
      { name: "homero", top: 0, image: "", parent_id: 2 },
      { name: "marge", top: 0, image: "", parent_id: 2 },
      { name: "bart", top: 1, image: "bart.jpg", parent_id: 2 },
      { name: "lisa", top: 0, image: "", parent_id: 2 },
      { name: "maggie", top: 0, image: "", parent_id: 2 },
      { name: "hotsale", top: 0, image: "", parent_id: 3 },
      { name: "descuentos", top: 0, image: "", parent_id: 3 },
      { name: "envios", top: 0, image: "", parent_id: 3 },
      { name: "2x1", top: 0, image: "", parent_id: 3 },
      { name: "tamaño", top: 0, image: "", parent_id: null },
      { name: "adultos", top: 1, image: "adult.jpg", parent_id: 13 },
      { name: "niños", top: 1, image: "children.jpg", parent_id: 13 },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('categories', null, {});
  }
};
