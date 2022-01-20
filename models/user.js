'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    user_first_name: DataTypes.STRING,
    user_last_name: DataTypes.STRING,
    user_email: DataTypes.STRING,
    user_password: DataTypes.STRING,
    user_address: DataTypes.STRING,
    user_phone_no: DataTypes.STRING,
    user_role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};