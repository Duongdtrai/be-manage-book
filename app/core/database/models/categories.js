'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Categories extends Model {
    static associate(models) {
      Categories.hasMany(models.Books, {
        foreignKey: 'category',
        as: 'category_book'
      });
      Categories.belongsTo(models.Avatars, {
        foreignKey: 'imageId',
        as: 'avatar_category'
      })
    }
  }
  Categories.init({
    title: DataTypes.STRING,
    imageId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Categories',
    timestamps: true,
    paranoid: true
  });
  return Categories;
};