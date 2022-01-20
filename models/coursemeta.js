'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CourseMeta extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CourseMeta.init({
    course_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    user_role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'CourseMeta',
  });
  return CourseMeta;
};