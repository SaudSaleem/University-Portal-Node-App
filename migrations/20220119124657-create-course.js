'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Courses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      course_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      faculty_type: {
        type: Sequelize.STRING
      },
      course_description: {
        type: Sequelize.STRING
      },
      //foreign key usage
      faculty_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Faculties",
          key: "id",
        },
        onUpdate: "cascade",
        onDelete: "cascade",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Courses');
  }
};