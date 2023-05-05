'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BookComments extends Model {
    static associate(models) {
      BookComments.belongsTo(models.Books, { foreignKey: 'bookId', as: 'book' });
      BookComments.belongsTo(models.Users, { foreignKey: 'userId', as: 'user' });
    }
  }
  BookComments.init({
    userId: DataTypes.INTEGER,
    bookId: DataTypes.INTEGER,
    comment: DataTypes.STRING,
    star: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'BookComments',
    timestamps: true,
    paranoid: true
  });
  return BookComments;
};