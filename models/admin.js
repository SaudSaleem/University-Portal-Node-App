"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");
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
  Admin.init(
    {
      admin_first_name: {
        type: DataTypes.STRING,
        set(value) {
          this.setDataValue("admin_first_name", value.toLowerCase());
        },
      },
      admin_last_name: {
        type: DataTypes.STRING,
        set(value) {
          this.setDataValue("admin_last_name", value.toLowerCase());
        },
      },
      admin_email: DataTypes.STRING,
      admin_password: {
        type: DataTypes.STRING,
        set(value) {
          const hash = bcrypt.hashSync(value, 10);
          this.setDataValue("admin_password", hash);
        },
      },
      admin_address: DataTypes.STRING,
      admin_phone_no: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Admin",
    }
  );
  return Admin;
};
