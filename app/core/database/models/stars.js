'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Stars extends Model {
    static associate(models) {
      
    }
  }
  Stars.init({
    userId: DataTypes.INTEGER,
    bookId: DataTypes.INTEGER,
    star: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Stars',
    timestamps: true,
    paranoid: true
  });
  return Stars;
};