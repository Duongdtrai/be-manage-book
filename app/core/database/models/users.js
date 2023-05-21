'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      // Users.belongsToMany(models.Books, {
      //   as: 'comment_user',
      //   foreignKey: 'userId',
      //   through:  models.BookComments,
      // });
      Users.belongsToMany(models.Books,
        {
          through: models.Carts,
          as: 'bookCart',
          foreignKey: 'userId'
        })
      Users.hasOne(models.Tokens, {
        as: "token",
        foreignKey: 'userId'
      })
      Users.belongsTo(models.Avatars, {
        as: "avatar_user",
        foreignKey: 'imageId'
      })

      Users.hasMany(models.Carts, {
        as: "cart",
        foreignKey: 'userId'
      })
      Users.hasMany(models.BookComments, {
        as: "commentUser",
        foreignKey: 'userId'
      })
    }
  }
  Users.init({
    imageId: DataTypes.INTEGER,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    gender: DataTypes.STRING,
    age: DataTypes.INTEGER,
    role: DataTypes.INTEGER,
    address: DataTypes.STRING,
    numberPhone: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Users',
    timestamps: true,
    paranoid: true
  });
  return Users;
};