'use strict';
/** @type {import('sequelize-cli').Migration} */

const _tableAvatars = "Avatars"
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn(_tableAvatars, 'avatar', 'image');
    await queryInterface.addColumn(_tableAvatars, 'cloudId', { type: Sequelize.STRING });

  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(_tableTokens);
  }
};