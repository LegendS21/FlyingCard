'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Profile.belongsTo(models.User)
      Profile.hasMany(models.Transaction)
    }
  }
  Profile.init({
    UserId: {
      type: DataTypes.INTEGER,
      unique: true
    },
    fullname: DataTypes.STRING,
    gender: DataTypes.STRING,
    phone: DataTypes.INTEGER,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};