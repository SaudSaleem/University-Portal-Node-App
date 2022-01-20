'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Faculty extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Faculty.init({
    faculty_name: DataTypes.STRING,
    faculty_type: DataTypes.STRING,
    faculty_description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Faculty',
  });
  return Faculty;
};