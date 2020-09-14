'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('skus', [
      { sku: "011221", price: 100, product_id: 1 },
      { sku: "011222", price: 100, product_id: 1 },
      { sku: "011223", price: 100, product_id: 1 },
      { sku: "021221", price: 200, product_id: 2 },
      { sku: "021222", price: 200, product_id: 2 },
      { sku: "031223", price: 300, product_id: 3 },
      { sku: "041221", price: 400, product_id: 4 },
      { sku: "051222", price: 500, product_id: 5 },
      { sku: "061223", price: 150, product_id: 6 },
      { sku: "071221", price: 250, product_id: 7 },
      { sku: "081222", price: 350, product_id: 8 },
      { sku: "091223", price: 450, product_id: 9 },
      { sku: "101221", price: 550, product_id: 10 },
      { sku: "111121", price: 100, product_id: 11 },
      { sku: "121221", price: 200, product_id: 12 },
      { sku: "131321", price: 300, product_id: 13 },
      { sku: "141122", price: 400, product_id: 14 },
      { sku: "151222", price: 500, product_id: 15 },
      { sku: "161122", price: 150, product_id: 16 },
      { sku: "171123", price: 250, product_id: 17 },
      { sku: "181223", price: 350, product_id: 18 },
      { sku: "191123", price: 450, product_id: 19 },
      { sku: "201121", price: 550, product_id: 20 },
      { sku: "211222", price: 100, product_id: 21 },
      { sku: "221223", price: 200, product_id: 22 },
      { sku: "231323", price: 300, product_id: 23 },
      { sku: "241323", price: 400, product_id: 24 }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('skus', null, {});
  }
};