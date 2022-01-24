const Joi = require("joi");
//method to validate user data
function validateUser(req, res, next) {
  try {
    const schema = Joi.object().keys({
      user_first_name: Joi.string().regex(/^[A-Za-z]+$/).min(3).max(30).required(),
      user_last_name: Joi.string().regex(/^[A-Za-z]+$/).min(3).max(30).required(),
      user_email: Joi.string()
        .regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
        .min(4)
        .max(30)
        .required(),
      user_password: Joi.string().min(5).max(30).required(),
      user_role: Joi.string().regex(/^(student|teacher)$/).required(),
      user_address: Joi.string().optional(),
      user_phone_no: Joi.string().regex(/^\(?([0-9]{4})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/).optional(),
      faculty_id:Joi.number().optional(),
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
function validateUserUpdation(req, res, next) {
  try {
    const schema = Joi.object().keys({
      user_first_name: Joi.string().regex(/^[A-Za-z]+$/).min(3).max(30).optional(),
      user_last_name: Joi.string().regex(/^[A-Za-z]+$/).min(3).max(30).optional(),
      user_email: Joi.string()
        .regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
        .min(4)
        .max(30)
        .optional(),
      user_password: Joi.string().min(5).max(30).optional(),
      user_role: Joi.string().regex(/^(student|teacher)$/).optional(),
      user_address: Joi.string().optional(),
      user_phone_no: Joi.string().regex(/^\(?([0-9]{4})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/).optional(),
      faculty_id:Joi.number().optional(),
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
  validateUser,
  validateUserUpdation
};
