'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.Profile)
      Transaction.hasMany(models.Ticket)
    }
  }
  Transaction.init({
    ProfileId: DataTypes.INTEGER,
    totalSeat: DataTypes.INTEGER,
    totalPrice: DataTypes.INTEGER,
    statusPayment: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};