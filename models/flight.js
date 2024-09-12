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
    airlineName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          //mengatur pesan error
          args: true,
          msg: 'airline name cannot be empty'
        },
        notNull: {
          args: true,
          msg: 'airline name cannot be null'
        },
      }
    },
    destination: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          //mengatur pesan error
          args: true,
          msg: 'destination cannot be empty'
        },
        notNull: {
          args: true,
          msg: 'destination cannot be null'
        },
      }
    },
    origin: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          //mengatur pesan error
          args: true,
          msg: 'origin cannot be empty'
        },
        notNull: {
          args: true,
          msg: 'origin cannot be null'
        },
      }
    },
    availabeSeat: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          //mengatur pesan error
          args: true,
          msg: 'first name cannot be empty'
        },
        notNull: {
          args: true,
          msg: 'first name cannot be null'
        },
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          //mengatur pesan error
          args: true,
          msg: 'first name cannot be empty'
        },
        notNull: {
          args: true,
          msg: 'first name cannot be null'
        },
      }
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          //mengatur pesan error
          args: true,
          msg: 'first name cannot be empty'
        },
        notNull: {
          args: true,
          msg: 'first name cannot be null'
        },
      }
    },
    arrived: {
      type: DataTypes.TIME,
      allowNull: false,
      validate: {
        notEmpty: {
          //mengatur pesan error
          args: true,
          msg: 'first name cannot be empty'
        },
        notNull: {
          args: true,
          msg: 'first name cannot be null'
        },
      }
    },
    imageURL: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          //mengatur pesan error
          args: true,
          msg: 'first name cannot be empty'
        },
        notNull: {
          args: true,
          msg: 'first name cannot be null'
        },
      }
    },
    dateFlight: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: {
          //mengatur pesan error
          args: true,
          msg: 'first name cannot be empty'
        },
        notNull: {
          args: true,
          msg: 'first name cannot be null'
        },
      }
    }
  }, {
    sequelize,
    modelName: 'Flight',
  });
  return Flight;
};