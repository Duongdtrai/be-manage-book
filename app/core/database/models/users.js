'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      Users.belongsToMany(models.Books, { through: 'stars', as: 'starsBooks', foreignKey: 'userId' });
      Users.belongsToMany(models.Books, { through: 'carts', as: 'cartBooks', foreignKey: 'userId'})
      Users.hasOne(models.Tokens, {
        as: "token",
				foreignKey: 'userId'
			})
    }
  }
  Users.init({
    avatar: DataTypes.STRING,
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