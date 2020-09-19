'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Variant extends Model {
    static associate(models) {
      this.hasMany(models.variant_value, { foreignKey: 'variant_id' });
      this.belongsToMany(models.product, { through: 'products_variants' });
    }
  };
  Variant.init({
    name: DataTypes.STRING,
    display: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'variant',
  });
  return Variant;
};