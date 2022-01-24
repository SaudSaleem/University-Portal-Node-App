module.exports = {
  up: (queryInterface, Sequelize) => {
    // Product belongsToMany Tag
    return queryInterface.createTable(
      'UserSub',
      {
        course_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
        },
        user_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
        },
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    // remove table
    return queryInterface.dropTable('UserSub');
  },
};