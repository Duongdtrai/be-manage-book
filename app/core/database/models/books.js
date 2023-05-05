'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Books extends Model {
    static associate(models) {
      // Books.belongsToMany(models.Users, {
      //   as: 'comment_book',
      //   foreignKey: 'bookId',
      //   through:  models.BookComments,
      // });
      Books.belongsTo(models.Avatars, {
        as: 'avatar_book',
        foreignKey: 'imageId'
      });
      Books.belongsToMany(models.Users,
        {
          through: models.Carts,
          as: 'userCart',
          foreignKey: 'bookId'
        });
      Books.belongsTo(models.Authors, {
        foreignKey: 'author',
        as: "author_book"
      });
      Books.belongsTo(models.Categories, {
        foreignKey: 'category',
        as: 'category_book'
      })
      Books.hasMany(models.Carts, {
        foreignKey: 'bookId',
        as: 'book'
      })
      Books.hasMany(models.BookComments, {
        as: "commentUser",
        foreignKey: 'bookId'
      })
    }
  }
  Books.init({
    imageId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.INTEGER,
    author: DataTypes.INTEGER,
    category: DataTypes.INTEGER,
    numberPage: DataTypes.INTEGER,
    releaseDate: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Books',
    timestamps: true,
    paranoid: true
  });
  return Books;
};