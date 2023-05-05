'use strict';
/** @type {import('sequelize-cli').Migration} */

const _tableBook = "Books"
const _tableAuthor = "Authors"
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    await queryInterface.changeColumn(_tableBook, 'author', {
      type: Sequelize.INTEGER,
      allowNull: false,
      // references: {
      //   model: _tableAuthor,
      //   key: 'id'
      // },
    }, { transaction })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(_tableBook);
  }
};