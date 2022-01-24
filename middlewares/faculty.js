const Joi = require("joi");
//method to validate user data
function validateFaculty(req, res, next) {
  try {
    const schema = Joi.object().keys({
      faculty_name: Joi.string().regex(/^[A-Za-z]+$/).min(3).max(30).required(),
      faculty_description: Joi.string().min(3).max(60),
    });
    const result = schema.validate(req.body);

    if (result.error) {
      {
        return res.status(400).json({
          success: false,
          msg: result.error.details.map(i => i.message).join(',')
        });
      }
    } else next();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
//method to validate user updation data
function validateFacultyUpdation(req, res, next) {
  try {
    const schema = Joi.object().keys({
      faculty_name: Joi.string().regex(/^[A-Za-z]+$/).min(3).max(30).optional(),
      faculty_description: Joi.string().min(3).max(60),
    });
    const result = schema.validate(req.body);
    if (result.error) {
      {
        return res.status(400).json({
          success: false,
          msg: result.error.details.map(i => i.message).join(',')
        });
      }
    } else next();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
module.exports = {
  validateFaculty,
  validateFacultyUpdation
};
