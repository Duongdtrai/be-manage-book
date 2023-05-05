'use strict';
/** @type {import('sequelize-cli').Migration} */

const _tableStars = "Stars"
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(_tableStars, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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
      star: {
        type: Sequelize.INTEGER,
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
    // await queryInterface.addConstraint(_tableStars, {
    //   type: 'foreign key',
    //   fields: ['userId', 'bookId'],
    //   onDelete: 'CASCADE',
    //   onUpdate: 'CASCADE',
    // });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint(_tableStars, 'userId');
    await queryInterface.dropTable(_tableStars);
  }
};