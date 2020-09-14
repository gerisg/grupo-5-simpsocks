'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      this.belongsToMany(models.product, { through:'categories_products' });
    }
  };
  Category.init({
    name: { type: DataTypes.STRING(255), allowNull: false }
  }, {
    sequelize,
    modelName: 'category',
  });
  return Category;
};