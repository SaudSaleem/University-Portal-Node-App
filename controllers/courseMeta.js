const courseMetaModel = require("../models").CourseMeta;

//return all courses meta
const getAllCoursesMeta = async (req, res) => {
  try {
    let courses = await courseMetaModel.findAll();
    res.status(200).send(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// add new meta record of course
const addCourseMeta = async (req, res) => {
  try {
    const record = await courseMetaModel.create({
      course_id: req.body.course_id,
      user_id: req.body.user_id,
      user_role: req.body.user_role,
    });
    res.status(201).send(record);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// assign student to teacher
const assignStudent = async (req, res) => {
  try {
    const record = await courseMetaModel.create({
      course_id: req.body.course_id,
      user_id: req.body.user_id,
      user_role: req.body.user_role,
    });
    res.status(201).send(record);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// update meta record of course
const updateCourseMeta = async (req, res) => {
  try {
    //check if record exist
    let course = await courseMetaModel.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!course) {
      res.status(404).send("Course with given id is not found!");
      return;
    }
    const updatedRecord = await courseMetaModel.update(
      {
        course_id: req.body.course_id,
        user_id: req.body.user_id,
        user_role: req.body.user_role,
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

// delete meta record of course
const deleteCourseMeta = async (req, res) => {
  try {
    //check if course exist
    let course = await courseMetaModel.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!course) {
      res.status(404).send("course with given id is not found!");
      return;
    }
    await courseMetaModel.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).send("course deleted successfully");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllCoursesMeta,
  addCourseMeta,
  updateCourseMeta,
  deleteCourseMeta,
  assignStudent,
};
