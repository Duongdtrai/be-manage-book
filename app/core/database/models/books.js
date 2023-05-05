'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Books extends Model {
    static associate(models) {
      Books.hasMany(models.BookComments, {
        as: 'comment',
        foreignKey: 'bookId'
      });
      Books.hasMany(models.BookAvatars, {
        as: 'avatar',
        foreignKey: 'bookId'
      });
      Books.belongsToMany(models.Users, {through: 'stars', as: 'starsUsers', foreignKey: 'bookId' });
      Books.belongsToMany(models.Users, {through: 'carts', as: 'cartUsers', foreignKey:'bookId'});
      Books.belongsTo(models.Authors, {
        foreignKey: 'author'
      });
    }
  }
  Books.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.INTEGER,
    author: DataTypes.INTEGER,
    numberPage: DataTypes.INTEGER,
    releaseDate:  DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Books',
    timestamps: true,
    paranoid: true
  });
  return Books;
};