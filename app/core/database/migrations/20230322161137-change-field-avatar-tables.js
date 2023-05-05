'use strict';
/** @type {import('sequelize-cli').Migration} */

const _tableUsers = "Users"
const _tableBooks = "Books"
const _tableAuthors = "Authors"
const _tableAvatars = "Avatars"

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint(_tableBooks, {
      fields: ['imageId'],
      type: 'foreign key',
      name: 'fk_books_avatars',
      references: {
        table: _tableAvatars,
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
    await queryInterface.addConstraint(_tableUsers, {
      fields: ['imageId'],
      type: 'foreign key',
      name: 'fk_users_avatars',
      references: {
        table: _tableAvatars,
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
    await queryInterface.addConstraint(_tableAuthors, {
      fields: ['imageId'],
      type: 'foreign key',
      name: 'fk_authors_avatars',
      references: {
        table: _tableAvatars,
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(_tableAvatars);
  }
};