'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Flight extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Flight.hasMany(models.Ticket)
    }
  }
  Flight.init({
    airlineName: DataTypes.STRING,
    destination: DataTypes.STRING,
    origin: DataTypes.STRING,
    availabeSeat: DataTypes.STRING,
    price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Flight',
  });
  return Flight;
};