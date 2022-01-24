'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Course.belongsTo(models.Faculty, {
        foreignKey: "faculty_id",
      });
      // Course.hasMany(models.CourseMeta, {
      //   foreignKey: "course_id",
      // });
      Course.belongsToMany(models.User, { through: 'UserCourse', foreignKey: 'course_id'} );
    }
  }
  Course.init({
    course_name: DataTypes.STRING,
    faculty_name: DataTypes.STRING,
    course_description: DataTypes.STRING,
    faculty_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Course',
  });
  return Course;
};