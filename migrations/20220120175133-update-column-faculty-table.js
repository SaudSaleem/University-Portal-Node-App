'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     queryInterface.changeColumn('Faculties', 'faculty_name', {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
  })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     queryInterface.changeColumn('Faculties', 'faculty_name', {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
  })
  }
};
