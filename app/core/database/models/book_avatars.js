'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BookAvatars extends Model {
    static associate(models) {
      BookAvatars.belongsTo(models.Books, { foreignKey: 'bookId', as: 'book' });
    }
  }
  BookAvatars.init({
    bookId: DataTypes.INTEGER,
    image: DataTypes.INTEGER,
    cloudId: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'BookAvatars',
    timestamps: true,
    paranoid: true
  });
  return BookAvatars;
};