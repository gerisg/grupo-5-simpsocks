'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      this.belongsToMany(models.category, { through: 'categories_products' });
      // workaround: https://stackoverflow.com/questions/53428989/sequelize-how-to-query-model-by-1n-association-but-include-all-associated-obj
      this.belongsToMany(models.category, { as: 'categoryFilter', through: 'categories_products' });
      this.belongsToMany(models.variant, { through: 'products_variants' });
      this.hasMany(models.sku, { foreignKey: 'product_id' });
      this.hasMany(models.image, { foreignKey: 'product_id' });
    }
  };
  Product.init({
    name: { type: DataTypes.STRING(255), allowNull: false },
    description: { type: DataTypes.STRING(255) },
    discount: { type: DataTypes.INTEGER(11), defaultValue: 0 },
    price: { type: DataTypes.FLOAT, allowNull: false },
    created_at: { type: DataTypes.DATE, allowNull: false }
  }, {
    sequelize,
    modelName: 'product',
  });
  return Product;
};