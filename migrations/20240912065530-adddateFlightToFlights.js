'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Flights', 'dateFlight',{
      type: Sequelize.DATE,
      allowNull: false,
    })
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeColumn('Flights', 'dateFlight', {})
  }
};
