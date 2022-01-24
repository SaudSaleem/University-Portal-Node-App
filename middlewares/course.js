const Joi = require("joi");
const facultyModel = require("../models").Faculty;
//method to validate COURSE data
function validateCourse(req, res, next) {
  try {
    const schema = Joi.object().keys({
      course_name: Joi.string().min(3).max(30).required(),
      course_description: Joi.string().min(3).max(60),
      faculty_id: Joi.number().required(),
    });
    const result = schema.validate(req.body);
    if (result.error) {
      {
        return res.status(400).json({
          success: false,
          msg: result.error.details.map((i) => i.message).join(","),
        });
      }
    }
    //check whether faculty id exist in faculty table
    let faculty = facultyModel.findByPk(req.body.faculty_id);
    if (!faculty) {
      res.status(400).json({ error: "Faculty with given id does not exist" });
    } else next();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
//method to validate COURSE updation data
function validateCourseUpdation(req, res, next) {
  try {
    const schema = Joi.object().keys({
      course_name: Joi.string().min(3).max(30),
      course_description: Joi.string().min(3).max(60),
      faculty_id: Joi.number(),
    });
    const result = schema.validate(req.body);
    if (result.error) {
      {
        return res.status(400).json({
          success: false,
          msg: result.error.details.map((i) => i.message).join(","),
        });
      }
    }
    //check whether faculty id exist in faculty table
    let faculty = facultyModel.findByPk(req.body.faculty_id);
    if (!faculty) {
      res.status(400).json({ error: "Faculty with given id does not exist" });
    } else next();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
module.exports = {
  validateCourse,
  validateCourseUpdation,
};
