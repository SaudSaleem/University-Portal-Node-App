'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserCourse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // UserCourse.belongsTo(models.User, {
      //   foreignKey: "user_id",
      // });
      // UserCourse.belongsTo(models.Course, {
      //   foreignKey: "course_id",
      // });
    }
  }
  UserCourse.init({
    course_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
  }, {
    sequelize,
    tableName:'UserCourse',
    modelName: 'UserCourse',
  });
  return UserCourse;
};