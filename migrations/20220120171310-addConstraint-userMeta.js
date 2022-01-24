'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     queryInterface.changeColumn('UserMeta', 'user_id', {
      type: Sequelize.DataTypes.INTEGER,
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
     queryInterface.changeColumn('UserMeta', 'user_id', {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: true,
  })
  }
};
