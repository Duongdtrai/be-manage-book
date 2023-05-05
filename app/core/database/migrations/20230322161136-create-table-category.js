'use strict';
/** @type {import('sequelize-cli').Migration} */

const _tableCategories = "Categories"
const _tableAvatars = "Avatars"

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(_tableCategories, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      imageId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: _tableAvatars,
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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
    await queryInterface.dropTable(_tableCategories);
  }
};