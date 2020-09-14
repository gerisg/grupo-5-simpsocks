'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    static associate(models) {
      this.belongsTo(models.user, { foreignKey: 'user_id' });
    }
  };
  Address.init({
    street: { type: DataTypes.STRING(255), allowNull: false },
    number: { type: DataTypes.INTEGER(11), allowNull: false },
    city: { type: DataTypes.STRING(255), allowNull: false },
    type: { type: DataTypes.STRING(255), allowNull: false }
  }, {
    sequelize,
    modelName: 'address'
  });
  return Address;
};