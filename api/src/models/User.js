const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('user', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlphanumeric: true,
      },
    },
    idPersonalData: {
      type: DataTypes.INTEGER,
      allowNull: true,
      unique: true,
    },
    role: {
      type: DataTypes.ENUM('admin', 'user', 'banned'),
      allowNull: false,
    },
  });
};
