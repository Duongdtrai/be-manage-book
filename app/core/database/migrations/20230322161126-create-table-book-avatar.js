'use strict';
/** @type {import('sequelize-cli').Migration} */

const _tableBookAvatars = "BookAvatars"
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(_tableBookAvatars, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      bookId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Books',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      avatar: {
        type: Sequelize.STRING,
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
    await queryInterface.removeConstraint(_tableBookAvatars, 'userId');
    await queryInterface.dropTable(_tableBookAvatars);
  }
};