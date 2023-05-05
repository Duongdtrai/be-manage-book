'use strict';
/** @type {import('sequelize-cli').Migration} */

const _tableBookAvatars = "BookAvatars"
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn(_tableBookAvatars, 'avatar', 'image');
    await queryInterface.addColumn(_tableBookAvatars, 'cloudId', { type: Sequelize.STRING });

  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(_tableTokens);
  }
};