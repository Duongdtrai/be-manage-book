'use strict'
const { Model, DataTypes } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
	class Carts extends Model {
		static associate(models) {
			Carts.belongsTo(models.Users, {
				as: "user",
				foreignKey: 'userId'
			})
			Carts.belongsTo(models.Books, {
				as: "book",
				foreignKey: 'bookId'
			})
		}
	}
	Carts.init({
		status: DataTypes.STRING,
		note: DataTypes.STRING,
		address: DataTypes.STRING,
		numberPhone: DataTypes.STRING,
		quantity: DataTypes.INTEGER,
		userId: DataTypes.INTEGER,
		bookId: DataTypes.INTEGER,
	}, {
		sequelize,
		modelName: 'Carts',
		timestamps: true,
		paranoid: true
	});
	return Carts
}