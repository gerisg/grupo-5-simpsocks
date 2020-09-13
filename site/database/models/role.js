'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      this.hasMany(models.user, { foreignKey: 'role_id' });
    }
  };
  Role.init({
    name: { type: DataTypes.STRING(255), allowNull: false }
  }, {
    sequelize,
    modelName: 'role',
  });
  return Role;
};