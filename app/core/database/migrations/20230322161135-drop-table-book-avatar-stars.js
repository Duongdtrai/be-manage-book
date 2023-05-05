'use strict';
/** @type {import('sequelize-cli').Migration} */

const _tableBookAvatars = "BookAvatars"
const _tableStars = "Stars"
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.dropTable(_tableBookAvatars);
    await queryInterface.dropTable(_tableStars);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(_tableBookAvatars);
  }
};