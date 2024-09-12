'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Ticket.belongsTo(models.Transaction)
      Ticket.belongsTo(models.Flight)
    }
  }
  Ticket.init({
    ProfileId: DataTypes.INTEGER,
    FlightId: DataTypes.INTEGER,
    passanger: DataTypes.STRING,
    NIK: DataTypes.INTEGER,
    dateOfBirth: DataTypes.DATE,
    gender: DataTypes.STRING,
    baggage: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Ticket',
  });
  return Ticket;
};