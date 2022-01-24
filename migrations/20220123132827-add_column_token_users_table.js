'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    // Order belongsTo Customer
    return queryInterface.addColumn(
      'Users', // name of Source model
      'token', // name of the key we're adding 
      {
        type: Sequelize.STRING(255)
      }
    )
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    // remove Order belongsTo Customer
    return queryInterface.removeColumn(
      'Users', // name of Source model
      'token' // key we want to remove
    )
  }
};
