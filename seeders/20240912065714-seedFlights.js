'use strict';
const { readFile } = require('fs').promises
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = JSON.parse(await readFile ('./data/flights.json', 'utf-8')).map(el => {
      delete el.id 
      el.createdAt = new Date()
      el.updatedAt = new Date()
      return el
   })
   await queryInterface.bulkInsert('Flights', data, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Flights', null, {})
  }
};
