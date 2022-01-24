"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.StudentTeacher, {
        foreignKey: "user_id",
      });
      User.belongsTo(models.Faculty, {
        foreignKey: "faculty_id",
      });
      User.belongsToMany(models.Course, {
        through: "UserCourse",
        foreignKey: "user_id",
      });
    }
  }
  User.init(
    {
      user_first_name: {
        type: DataTypes.STRING,
        set(value) {
          this.setDataValue("user_first_name", value.toLowerCase());
        },
      },
      user_last_name: {
        type: DataTypes.STRING,
        set(value) {
          this.setDataValue("user_last_name", value.toLowerCase());
        },
      },
      user_email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
          notNull: true,
          notEmpty: true,
          min: 2,
          max: 30,
        },
      },
      user_password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
          min: 5,
          max: 30,
        },
        set(value) {
          const hash = bcrypt.hashSync(value, 10);
          this.setDataValue("user_password", hash);
        },
      },
      user_address: DataTypes.STRING,
      user_phone_no: DataTypes.STRING,
      user_role: {
        type: DataTypes.STRING,
        set(value) {
          this.setDataValue("user_role", value.toLowerCase());
        },
      },
      faculty_id: DataTypes.INTEGER,
      token: DataTypes.STRING(255),
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
