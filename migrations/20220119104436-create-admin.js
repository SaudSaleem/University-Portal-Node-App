'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Admins', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      admin_first_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      admin_last_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      admin_email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      admin_password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      admin_address: {
        type: Sequelize.STRING
      },
      admin_phone_no: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Admins');
  }
};