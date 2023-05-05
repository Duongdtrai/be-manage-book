'use strict';
/** @type {import('sequelize-cli').Migration} */

const _tableBook = "Books"
const _tableAuthor = "Authors"
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint('Books', {
      fields: ['author'],
      type: 'foreign key',
      references: {
        table: _tableAuthor,
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(_tableBook);
  }
};