var fs = require("fs");
var path = require("path");
const bcrypt = require("bcrypt");

("use strict");
let dataArray = [];
module.exports = {
  async up(queryInterface, Sequelize) {

    var data = fs.readFileSync(path.resolve(__dirname, "./users.csv"), "utf8");
    
 
    data = data.split("\n"); 
    for (let i in data) {
      // SPLIT COLUMNS
      data[i] = data[i].split(",");
      dataArray.push({
        user_first_name: data[i][0],
        user_last_name: data[i][1],
        user_email: data[i][2],
        user_password: bcrypt.hashSync(data[i][3], 10),
        user_address: data[i][4],
        user_phone_no : data[i][5],
        user_role: data[i][6],
        faculty_id: data[i][7],
        createdAt : new Date(),
        updatedAt : new Date()
      });
    }

    await queryInterface.bulkInsert("Users", dataArray, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     */
     let addedEmails = dataArray.map(user => user.user_email);
    await queryInterface.bulkDelete("Users", null, {
      where: {
        user_email: [...addedEmails],
      },
    });
  },
};
