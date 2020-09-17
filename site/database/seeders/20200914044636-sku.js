'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('skus', [
      { sku: "011221", stock: 100, product_id: 1 },
      { sku: "011222", stock: 100, product_id: 1 },
      { sku: "011223", stock: 100, product_id: 1 },
      { sku: "021221", stock: 200, product_id: 2 },
      { sku: "021222", stock: 200, product_id: 2 },
      { sku: "031223", stock: 300, product_id: 3 },
      { sku: "041221", stock: 400, product_id: 4 },
      { sku: "051222", stock: 500, product_id: 5 },
      { sku: "061223", stock: 150, product_id: 6 },
      { sku: "071221", stock: 250, product_id: 7 },
      { sku: "081222", stock: 350, product_id: 8 },
      { sku: "091223", stock: 450, product_id: 9 },
      { sku: "101221", stock: 550, product_id: 10 },
      { sku: "111121", stock: 100, product_id: 11 },
      { sku: "121221", stock: 200, product_id: 12 },
      { sku: "131321", stock: 300, product_id: 13 },
      { sku: "141122", stock: 400, product_id: 14 },
      { sku: "151222", stock: 500, product_id: 15 },
      { sku: "161122", stock: 150, product_id: 16 },
      { sku: "171123", stock: 250, product_id: 17 },
      { sku: "181223", stock: 350, product_id: 18 },
      { sku: "191123", stock: 450, product_id: 19 },
      { sku: "201121", stock: 550, product_id: 20 },
      { sku: "211222", stock: 100, product_id: 21 },
      { sku: "221223", stock: 200, product_id: 22 },
      { sku: "231323", stock: 300, product_id: 23 },
      { sku: "241323", stock: 400, product_id: 24 }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('skus', null, {});
  }
};