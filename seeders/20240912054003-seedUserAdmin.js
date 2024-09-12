'use strict';
const bcrypt = require('bcryptjs')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const salt = await bcrypt.genSalt(10);
    const data = [{
      username: "admin",
      password: await bcrypt.hash('admin', salt),
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date()
    }];

    await queryInterface.bulkInsert("Users", data);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null)
  }
};
