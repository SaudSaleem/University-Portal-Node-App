"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    return await queryInterface.addConstraint("UserMeta", {
      fields: ["user_id"],
      type: "foreign key",
      name: "custom_fkey_constraint_name_metaUser",
      references: {
        //Required field
        table: "Users",
        field: "id",
      },
      onDelete: "CASCADE",
      onDelete: 'SET NULL',
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    queryInterface.removeConstraint("UserMeta", "custom_fkey_constraint_name_metaUser");
  },
};
