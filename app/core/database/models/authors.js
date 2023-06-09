'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Authors extends Model {
    static associate(models) {
      Authors.hasMany(models.Books, {
        foreignKey: 'author',
        as: "author_book"
      });
      Authors.belongsTo(models.Avatars, {
        foreignKey: 'imageId',
        as: 'avatar',
      });
    }
  }
  Authors.init({
    fullName: DataTypes.STRING,
    imageId: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    birthday: DataTypes.STRING,
    address: DataTypes.STRING,
    gender: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Authors',
    timestamps: true,
    paranoid: true
  });
  return Authors;
};