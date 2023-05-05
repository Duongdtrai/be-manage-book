'use strict';
/** @type {import('sequelize-cli').Migration} */

const _tableAvatars = "Avatars"
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(_tableAvatars, {
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
    await queryInterface.removeConstraint(_tableAvatars, 'userId');
    await queryInterface.dropTable(_tableAvatars);
  }
};