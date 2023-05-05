'use strict';
/** @type {import('sequelize-cli').Migration} */

const _tableBookComments = "BookComments"
const _tableBooks =  "Books"
const _tableUsers = "Users"

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(_tableBookComments, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      bookId: {
        type: Sequelize.INTEGER,
        references: {
          model: _tableBooks,
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: _tableUsers,
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      comment: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      star: {
        type: Sequelize.INTEGER,
        allowNull: false
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
    await queryInterface.dropTable(_tableBookComments);
  }
};