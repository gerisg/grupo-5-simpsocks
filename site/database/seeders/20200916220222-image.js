'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('images', [
      { product_id: 1, name: "medias-bart-cowman-1.jpg" },
      { product_id: 1, name: "medias-bart-cowman-2.jpg" },
      { product_id: 2, name: "medias-bart-cowman-azul-1.jpg" },
      { product_id: 2, name: "medias-bart-cowman-azul-2.jpg" },
      { product_id: 3, name: "medias-bart-gris-1.jpg" },
      { product_id: 3, name: "medias-bart-gris-2.jpg" },
      { product_id: 4, name: "medias-bart-homme-1.png" },
      { product_id: 4, name: "medias-bart-homme-2.png" },
      { product_id: 5, name: "medias-homero-burger-1.jpg" },
      { product_id: 5, name: "medias-homero-burger-2.jpg" },
      { product_id: 5, name: "medias-homero-burger-3.jpg" },
      { product_id: 6, name: "medias-homero-dona-1.jpg" },
      { product_id: 6, name: "medias-homero-dona-2.png" },
      { product_id: 6, name: "medias-homero-dona-3.png" },
      { product_id: 7, name: "medias-homero-donas-1.jpg" },
      { product_id: 7, name: "medias-homero-donas-2.jpg" },
      { product_id: 8, name: "medias-homero-kit-1.jpg" },
      { product_id: 8, name: "medias-homero-kit-2.jpg" },
      { product_id: 8, name: "medias-homero-kit-3.jpg" },
      { product_id: 9, name: "medias-maggie-blancas-1.jpg" },
      { product_id: 9, name: "medias-maggie-blancas-2.jpg" },
      { product_id: 10, name: "medias-personajes-negras-1.jpg" },
      { product_id: 10, name: "medias-personajes-negras-2.jpg" },
      { product_id: 11, name: "soquetes-bart-cowman-1.jpg" },
      { product_id: 12, name: "medias-homero-rosquillas-blancas-1.jpg" },
      { product_id: 13, name: "bucaneras-maggie-negra-1.jpg" },
      { product_id: 14, name: "soquetes-bart-honda-1.jpg" },
      { product_id: 15, name: "medias-homero-rosquillas-rosa-1.jpg" },
      { product_id: 16, name: "soquetes-homero-traje-banio-1.jpg" },
      { product_id: 17, name: "soquetes-homero-cielo-1.jpg" },
      { product_id: 17, name: "soquetes-homero-cielo-2.jpg" },
      { product_id: 18, name: "medias-homero-sparkle-1.jpg" },
      { product_id: 19, name: "soquetes-lisa-saxo-1.jpg" },
      { product_id: 20, name: "soquetes-homero-desnudo-1.jpg" },
      { product_id: 21, name: "medias-burns-1.jpg" },
      { product_id: 21, name: "medias-burns-2.jpg" },
      { product_id: 21, name: "medias-burns-3.jpg" },
      { product_id: 22, name: "medias-marge-paleta-colores-1.jpg" },
      { product_id: 22, name: "medias-marge-paleta-colores-2.jpg" },
      { product_id: 22, name: "medias-marge-paleta-colores-3.jpg" },
      { product_id: 23, name: "bucaneras-lisa-1.jpg" },
      { product_id: 24, name: "bucaneras-marge-1.jpg" }
     ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('images', null, {});
  }
};
