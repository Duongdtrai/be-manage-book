'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BookComments extends Model {
    static associate(models) {
      BookComments.belongsTo(models.Books, { foreignKey: 'bookId', as: 'book' });
    }
  }
  BookComments.init({
    bookId: DataTypes.INTEGER,
    comment: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'BookComments',
    timestamps: true,
    paranoid: true
  });
  return BookComments;
};