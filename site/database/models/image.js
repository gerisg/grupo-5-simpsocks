'use strict';
const { Model} = require('sequelize');
const product = require('./product');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.product, { foreignKey: 'product_id' });
    }
  };
  Image.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'image',
  });
  return Image;
};