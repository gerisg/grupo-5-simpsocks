'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sku extends Model {
    static associate(models) {
      this.belongsTo(models.product, { foreignKey: 'product_id' });
      this.belongsToMany(models.variant_value, { through:'skus_variant_values' });
    }
  };
  Sku.init({
    sku: DataTypes.STRING,
    price: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'sku',
  });
  return Sku;
};