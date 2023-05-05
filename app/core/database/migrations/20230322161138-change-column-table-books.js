'use strict';
/** @type {import('sequelize-cli').Migration} */

const _tableUsers = "Users"
const _tableBooks = "Books"
const _tableCategories = "Categories"
const _tableAvatars = "Avatars"

module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    await queryInterface.changeColumn(_tableBooks, 'category', {
      type: Sequelize.INTEGER,
      allowNull: false,
    }, { transaction })
    
    await queryInterface.addConstraint(_tableBooks, {
      fields: ['category'],
      type: 'foreign key',
      name: 'fk_books_category',
      references: {
        table: _tableCategories,
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