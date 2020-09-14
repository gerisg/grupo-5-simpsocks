'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('products_variants', [
      { product_id: 1, variant_id: 1 },
      { product_id: 1, variant_id: 2 },
      { product_id: 2, variant_id: 1 },
      { product_id: 2, variant_id: 2 },
      { product_id: 3, variant_id: 1 },
      { product_id: 3, variant_id: 2 },
      { product_id: 4, variant_id: 1 },
      { product_id: 4, variant_id: 2 },
      { product_id: 5, variant_id: 1 },
      { product_id: 5, variant_id: 2 },
      { product_id: 6, variant_id: 1 },
      { product_id: 6, variant_id: 2 },
      { product_id: 7, variant_id: 1 },
      { product_id: 7, variant_id: 2 },
      { product_id: 8, variant_id: 1 },
      { product_id: 8, variant_id: 2 },
      { product_id: 9, variant_id: 1 },
      { product_id: 9, variant_id: 2 },
      { product_id: 10, variant_id: 1 },
      { product_id: 10, variant_id: 2 },
      { product_id: 11, variant_id: 1 },
      { product_id: 11, variant_id: 2 },
      { product_id: 12, variant_id: 1 },
      { product_id: 12, variant_id: 2 },
      { product_id: 13, variant_id: 1 },
      { product_id: 13, variant_id: 2 },
      { product_id: 14, variant_id: 1 },
      { product_id: 14, variant_id: 2 },
      { product_id: 15, variant_id: 1 },
      { product_id: 15, variant_id: 2 },
      { product_id: 16, variant_id: 1 },
      { product_id: 16, variant_id: 2 },
      { product_id: 17, variant_id: 1 },
      { product_id: 17, variant_id: 2 },
      { product_id: 18, variant_id: 1 },
      { product_id: 18, variant_id: 2 },
      { product_id: 19, variant_id: 1 },
      { product_id: 19, variant_id: 2 },
      { product_id: 20, variant_id: 1 },
      { product_id: 20, variant_id: 2 },
      { product_id: 21, variant_id: 1 },
      { product_id: 21, variant_id: 2 },
      { product_id: 22, variant_id: 1 },
      { product_id: 22, variant_id: 2 },
      { product_id: 23, variant_id: 1 },
      { product_id: 23, variant_id: 2 },
      { product_id: 24, variant_id: 1 },
      { product_id: 24, variant_id: 2 }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('products_variants', null, {});
  }
};