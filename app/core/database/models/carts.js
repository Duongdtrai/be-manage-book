'use strict'
const { Model, DataTypes } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
	class Carts extends Model {
		static associate(models) {

		}
	}
	Carts.init({
		status: DataTypes.STRING,
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