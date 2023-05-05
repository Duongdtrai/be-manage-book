'use strict';
/** @type {import('sequelize-cli').Migration} */

const _tableUsers = "Users"
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(_tableUsers, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      imageId: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      userName: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.STRING
      },
      age: {
        type: Sequelize.INTEGER
      },
      role: {
        type: Sequelize.INTEGER
      },
      address: {
        type: Sequelize.STRING
      },
      numberPhone: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(_tableUsers);
  }
};