const { Op } = require("sequelize");
const userModel = require("../models").User;
//method to validate admin data
async function validateAssignStudent(req, res, next) {
  console.log("hell");
  try {
    //check if student id provided
    if (!req.body.assigned_student_id) {
      throw new Error("Kindly provide Student id for this action");
    }
    //check if user exist
    let user = await userModel.findOne({
      where: {
        [Op.and]: [
          { id: req.body.user_id },
          { user_role: "teacher" },
        ],
      },
    });
    if (!user) {
      res
        .status(404)
        .send("User with given id is not found Or user role is not Teacher");
      return;
    } else {
      next();
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
module.exports = {
  validateAssignStudent,
};
