'use strict';
/** @type {import('sequelize-cli').Migration} */

const _tableUsers = "Users"
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(_tableUsers, 'password', {
      type: Sequelize.STRING,
      allowNull: false
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn(_tableUsers, 'password');
  }
};