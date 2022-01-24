'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class StudentTeacher extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      StudentTeacher.belongsTo(models.User, {
        foreignKey: "user_id",
      });
    }
  }
  StudentTeacher.init({
    assigned_teacher_id: DataTypes.INTEGER,
    assigned_student_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    tableName: 'StudentTeacher',
    modelName: 'StudentTeacher',
  });
  return StudentTeacher;
};