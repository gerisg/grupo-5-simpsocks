'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class VariantValue extends Model {
    static associate(models) {
      this.belongsTo(models.variant, { foreignKey: 'variant_id' });
      this.belongsToMany(models.sku, { through:'skus_variant_values' });
    }
  };
  VariantValue.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'variant_value',
  });
  return VariantValue;
};