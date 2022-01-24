module.exports = {
  up: (queryInterface, Sequelize) => {
    // Product belongsToMany Tag
    return queryInterface.createTable(
      'UserSubject',
      {
        course_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Courses',
            key: 'id'
          }
        },
        user_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'Users',
            key: 'id'
          }
        },
       
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    // remove table
    return queryInterface.dropTable('UserSubject');
  },
};