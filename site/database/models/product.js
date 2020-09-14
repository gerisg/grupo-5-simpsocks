'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      this.belongsToMany(models.category, { through:'categories_products' });
      this.belongsToMany(models.variant, { through:'products_variants' });
      this.hasMany(models.sku, { foreignKey: 'product_id' })
    }
  };
  Product.init({
    name: { type: DataTypes.STRING(255), allowNull: false },
    description: { type: DataTypes.STRING(255) }
  }, {
    sequelize,
    modelName: 'product',
  });
  return Product;
};