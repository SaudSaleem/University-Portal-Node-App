const courseModel = require("../models").Course;

// add new course
const addCourse = async (req, res) => {
  try {
    const addedCourse = await courseModel.create({
      course_name: req.body.course_name,
      faculty_name: req.body.faculty_name,
      course_description: req.body.course_description,
      faculty_id: req.body.faculty_id,
    });
    res.status(201).send(addedCourse);
  } catch (error) {
    if (error.errors && error.errors[0].type == "unique violation") {
      res
        .status(400)
        .json({ error: "This course already exist.Try another one" });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

//return all courses
const getAllCourses = async (req, res) => {
  try {
    let courses = await courseModel.findAll();
    res.status(200).send(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//return only one course based on given "ID"
const getCourseById = async (req, res) => {
  try {
    let course = await courseModel.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!course) res.status(404).send("course with given id is not found!");
    else res.status(200).send(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// update course in faculties table
const updateCourse = async (req, res) => {
  //check if course exist
  try {
    let course = await courseModel.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!course) {
      res.status(404).send("course with given id is not found!");
      return;
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
  try {
    await courseModel.update(
      {
        course_name: req.body.course_name,
        faculty_name: req.body.faculty_name,
        course_description: req.body.course_description,
        faculty_id: req.body.faculty_id,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(201).send("course updated");
  } catch (error) {
    if (error.errors && error.errors[0].type == "unique violation") {
      res
        .status(400)
        .json({ error: "This course already exist.Try another name" });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

// delete course from table
const deleteCourse = async (req, res) => {
  //check if course exist
  let course = await courseModel.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!course) {
    res.status(404).send("course with given id is not found!");
    return;
  }
  await courseModel.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.status(200).send("course deleted");
};

module.exports = {
  addCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
};
