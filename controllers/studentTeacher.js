const studentTeacherModel = require("../models").StudentTeacher;
const userModel = require("../models").User;
//return all users meta
const getAllUsersMeta = async (req, res) => {
  try {
    let users = await studentTeacherModel.findAll();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// add new meta record of user
const addUserMeta = async (req, res) => {
  //input validation for post data
  try {
    const record = await studentTeacherModel.create({
      assigned_teacher_id: req.body.assigned_teacher_id,
      assigned_student_id: req.body.assigned_student_id,
      user_id: req.body.user_id,
    });
    res.status(201).send(record);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// assign new student to teacher
const assignStudent = async (req, res) => {
  try {
    const record = await studentTeacherModel.create({
      assigned_student_id: req.body.assigned_student_id,
      user_id: req.body.user_id,
    });
    res.status(201).send(record);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// get particular teacher students
const getTeacherStudents = async (req, res) => {
  try {
    let user = await userModel.findByPk(req.body.user_id);
    if (user) {
      //let students = await user.getStudentTeachers();
      let students = await userModel.findAll({
        include: studentTeacherModel,
        where: { id: req.body.user_id },
      });
      res.status(200).send(students);
    } else res.status(404).json({ error: "User with given id is not found" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// update meta record of user
const updateUserMeta = async (req, res) => {
  try {
    //check if record exist
    let user = await studentTeacherModel.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!user) {
      res.status(404).send("User with given id is not found!");
      return;
    }
    const updatedRecord = await studentTeacherModel.update(
      {
        assigned_teacher_id: req.body.assigned_teacher_id,
        assigned_student_id: req.body.assigned_student_id,
        user_id: req.body.user_id,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(201).send(updatedRecord);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// delete meta record of user
const deleteUserMeta = async (req, res) => {
  try {
    //check if user exist
    let user = await studentTeacherModel.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!user) {
      res.status(404).send("User with given id is not found!");
      return;
    }
    await studentTeacherModel.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).send("User deleted successfully");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllUsersMeta,
  addUserMeta,
  updateUserMeta,
  deleteUserMeta,
  assignStudent,
  getTeacherStudents,
};
