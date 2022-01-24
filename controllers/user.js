const userModel = require("../models").User;
const courseModel = require("../models").Course;
const UserCourseModel = require("../models").UserCourse;
const jobs = require("../jobs/emailJob")
// const bankInfoModel = require("../models").bankInfo;
// const contactInfoModel = require("../models").contactInfo;

//return all users with bank account details
// one to one relation
// const getUsersBankInformation = async (req, res) => {
//   try{
//   let users = await usersModel.findAll({ include: bankInfoModele });
//   res.status(200).send(users);
//   }
//   catch (error) {
//     console.log("this is error",error)
//     res.status(400).json({error: error.toString()});
//   }
// };

//return all users with contact details
//one to many realtion
// const getUsersContactInformation = async (req, res) => {
//   let users = await usersModel.findAll({ include: contactInfoModel });
//   res.status(200).send(users);
// };

//return all users
const getAllUsers = async (req, res) => {
  try {
    let users = await userModel.findAll();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//return only one user based on given "ID"
const getUserById = async (req, res) => {
  try {
    let user = await userModel.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!user) res.status(404).send("User with given id is not found!");
    else res.status(200).send(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// add new user in user table
const addUser = async (req, res) => {
  //input validation for post data
  try {
    const addedUser = await userModel.create({
      user_first_name: req.body.user_first_name,
      user_last_name: req.body.user_last_name,
      user_email: req.body.user_email,
      user_password: req.body.user_password,
      user_role: req.body.user_role,
      user_address: req.body.user_address,
      user_phone_no: req.body.user_phone_no,
      faculty_id: req.body.faculty_id,
    });
    //send email to user
    jobs.sendEmail()
    res.status(201).send(addedUser);
  } catch (error) {
    if (error.errors && error.errors[0].type == "unique violation") {
      res
        .status(400)
        .json({ error: "This email already exist.Try another email" });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

// update user in user table
const updateUser = async (req, res) => {
  try {
    //check if user exist
    let user = await userModel.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!user) {
      res.status(404).send("User with given id is not found!");
      return;
    }
    const updatedUser = await userModel.update(
      {
        user_first_name: req.body.user_first_name,
        user_last_name: req.body.user_last_name,
        user_email: req.body.user_email,
        user_password: req.body.user_password,
        user_role: req.body.user_role,
        user_address: req.body.user_address,
        user_phone_no: req.body.user_phone_no,
        faculty_id: req.body.faculty_id,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(201).send(updatedUser);
  } catch (error) {
    if (error.errors && error.errors[0].type == "unique violation") {
      res
        .status(400)
        .json({ error: "This email already exist.Try another email" });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

// delete user from user table
const deleteUser = async (req, res) => {
  try {
    //check if user exist
    let user = await userModel.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!user) {
      res.status(404).send("User with given id is not found!");
      return;
    }
    await userModel.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).send("User deleted successfully");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const assignCourse = async (req, res) => {
  try {
    let user = await userModel.findByPk(req.body.user_id);
    let course = await courseModel.findByPk(req.body.course_id);
    if (!user) {
      res.status(404).json({ error: "User with given id not found" });
    }
    if (!course) {
      res.status(404).json({ error: "Course with given id not found" });
    }
    // UserCourseModel.create({
    //   course_id : req.body.course_id,
    //   user_id : req.body.user_id
    // })
    console.log("USERS",user.id,course.id)
     await user.addCourse(course);
    res.status(200).json({ message: "Course Assigned To User" });
  } catch (error) {
    console.log("actulw err",error)
    res.status(500).json({ error: error.message });
  }
};
const getUserCourses = async (req, res) => {
  try {
    let user = await userModel.findByPk(req.params.id);
    // let course = await courseModel.findByPk(req.body.course_id);
    if (!user) {
      res.status(400).json({ error: "User with given id not found" });
    }
   else {
     let courses =  await user.getCourses();
      res.status(200).json(courses);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
  assignCourse,
  getUserCourses
};
