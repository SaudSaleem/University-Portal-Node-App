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
      'faculty_id', // name of the key we're adding 
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Faculties', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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
      'user_id' // key we want to remove
    )
  }
};
