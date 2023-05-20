'use strict';
/** @type {import('sequelize-cli').Migration} */

const _tableCart = "Carts"
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(_tableCart, 'fullName', { type: Sequelize.STRING });

  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(_tableTokens);
  }
};