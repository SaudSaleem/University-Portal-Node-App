'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Admin.init({
    admin_first_name: DataTypes.STRING,
    admin_last_name: DataTypes.STRING,
    admin_email: DataTypes.STRING,
    admin_password: DataTypes.STRING,
    admin_address: DataTypes.STRING,
    admin_phone_no: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Admin',
  });
  return Admin;
};