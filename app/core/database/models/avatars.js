'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Avatars extends Model {
    static associate(models) {
      Avatars.hasOne(models.Books, {
        as: 'avatar_book',
        foreignKey: 'imageId'
      });
      Avatars.hasOne(models.Users, {
        foreignKey: 'imageId',
        as: 'avatar_user',
      });
      Avatars.hasOne(models.Categories, {
        foreignKey: 'imageId',
        as: 'avatar_category'
      });
      Avatars.hasOne(models.Authors, {
        foreignKey: 'imageId',
        as: 'avatar'
      });
    }
  }
  Avatars.init({
    image: DataTypes.STRING,
    cloudId: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Avatars',
    timestamps: true,
    paranoid: true
  });
  return Avatars;
};