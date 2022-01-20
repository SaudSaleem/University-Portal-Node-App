//import JOI module for input validation
const Joi = require("joi");
//method to validate user input
function validateUser(use, next) {
  const schema = {
    firstName: Joi.string().min(3).required(),
    lastName: Joi.string().min(3).required(),
    email: Joi.required(),
    password: Joi.string(),
  };
  const result = Joi.validate(user, schema);
  if (result.error) {
    {
      console.log("sayg");
    }
  } else return result;
}
module.exports = {
  validateUser,
};
