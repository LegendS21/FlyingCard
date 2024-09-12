'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Profile)
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: async (instance, options) => {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(instance.password, salt);
        instance.password = hash;
        instance.role = 'customer'
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};