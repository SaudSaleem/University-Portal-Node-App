const facultyModel = require("../models").Faculty;
const userModel = require("../models").User;
const courseModel = require("../models").Course
// add new faculty
const addFaculty = async (req, res) => {
  try {
    const addedFaculty = await facultyModel.create({
      faculty_name: req.body.faculty_name,
      faculty_description: req.body.faculty_description,
    });
    res.status(201).send(addedFaculty);
  } catch (error) {
    if (error.errors && error.errors[0].type == "unique violation") {
      res
        .status(400)
        .json({ error: "This faculty already exist.Try another one" });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

//return all faculties
const getAllFaculties = async (req, res) => {
  try {
    let faculties = await facultyModel.findAll();
    res.status(200).send(faculties);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//return only one faculty based on given "ID"
const getFacultyById = async (req, res) => {
  try {
    let faculty = await facultyModel.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!faculty) res.status(404).send("Faculty with given id is not found!");
    else res.status(200).send(faculty);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// update faculty in faculties table
const updateFaculty = async (req, res) => {
  //check if faculty exist
  try {
    let faculty = await facultyModel.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!faculty) {
      res.status(404).send("Faculty with given id is not found!");
      return;
    }
  } catch (e) {res.status(500).json({ error: e.message });}
  try {
       await facultyModel.update(
      {
        faculty_name: req.body.faculty_name,
        faculty_description: req.body.faculty_description,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(201).send("Faculty updated");
  } catch (error) {
    if (error.errors && error.errors[0].type == "unique violation") {
      res
        .status(400)
        .json({ error: "This faculty already exist.Try another name" });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

// delete faculty from faculty table
const deleteFaculty = async (req, res) => {
  //check if faculty exist
  let faculty = await facultyModel.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!faculty) {
    res.status(404).send("Faculty with given id is not found!");
    return;
  }
   await facultyModel.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.status(200).send("Faculty deleted");
};

//return users of faculty on given "ID"
const getFacultyUsers = async (req, res) => {
  try {
    let faculty = await facultyModel.findByPk(req.params.id);
    if (faculty) {
     // let users = await faculty.getUsers();
    let users = await facultyModel.findAll({ include: userModel,where:{id:req.params.id} });
      res.status(200).send(users);
    } else res.status(404).json({ error: "faculty with given id is not found" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//return courses of faculty on given "ID"
const getFacultyCourses = async (req, res) => {
  try {
    let faculty = await facultyModel.findByPk(req.params.id);
    if (faculty) {
     // let courses = await faculty.getCourses();
    let courses = await facultyModel.findAll({ include: courseModel,where:{id:req.params.id} });
      res.status(200).send(courses);
    } else res.status(404).json({ error: "faculty with given id is not found" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addFaculty,
  getAllFaculties,
  getFacultyById,
  updateFaculty,
  deleteFaculty,
  getFacultyUsers,
  getFacultyCourses
};
