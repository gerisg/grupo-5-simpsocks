'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Token extends Model {
    static associate(models) {
      this.belongsTo(models.user, { foreignKey: 'user_id' });
    }
  };
  Token.init({
    token: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'token',
  });
  return Token;
};