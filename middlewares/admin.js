const Joi = require("joi");
//method to validate admin data
function validateAdmin(req, res, next) {
  try {
    const schema = Joi.object().keys({
      admin_first_name: Joi.string()
        .regex(/^[A-Za-z]+$/)
        .min(3)
        .max(30)
        .required(),
      admin_last_name: Joi.string()
        .regex(/^[A-Za-z]+$/)
        .min(3)
        .max(30)
        .required(),
      admin_email: Joi.string()
        .regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
        .min(4)
        .max(30)
        .required(),
      admin_password: Joi.string().min(5).max(30).required(),
      admin_address: Joi.string().optional(),
      admin_phone_no: Joi.string()
        .regex(/^\(?([0-9]{4})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)
        .min(5)
        .max(30)
        .optional(),
    });
    const result = schema.validate(req.body);

    if (result.error) {
      {
        return res.status(400).json({
          success: false,
          msg: result.error.details.map((i) => i.message).join(","),
        });
      }
    } else next();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
//validation for PUT/UPDATE request
function validateAdminUpdation(req, res, next) {
  try {
    const schema = Joi.object().keys({
      admin_first_name: Joi.string()
        .regex(/^[A-Za-z]+$/)
        .min(3)
        .max(30)
        .optional(),
      admin_last_name: Joi.string()
        .regex(/^[A-Za-z]+$/)
        .min(3)
        .max(30)
        .optional(),
      admin_email: Joi.string()
        .regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
        .min(4)
        .max(30)
        .optional(),
      admin_password: Joi.string().min(5).max(30).optional(),
      admin_address: Joi.string().optional(),
      admin_phone_no: Joi.string().min(5).max(30).optional(),
    });
    const result = schema.validate(req.body);

    if (result.error) {
      {
        return res.status(400).json({
          success: false,
          msg: result.error.details.map((i) => i.message).join(","),
        });
      }
    } else next();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
module.exports = {
  validateAdmin,
  validateAdminUpdation,
};
