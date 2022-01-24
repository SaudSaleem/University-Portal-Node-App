const userModel = require("../models").User;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
// get config vars
dotenv.config();
console.log(process.env.TOKEN_SECRET)
const login = async (req, res) => {
  try {
    const user = await userModel.findOne({
      where: { user_email: req.body.user_email },
    });
    if (
      user &&
      (await bcrypt.compareSync(req.body.user_password, user.user_password))
    ) {
      // check user found and verify password
      const token = jwt.sign(
        // authentication successful
        { id: user.id, email: req.body.user_email },
        process.env.TOKEN_SECRET,
        {
          expiresIn: "2h",
        }
      );
        //save user token
      user.update({
        token: token,
      });
      res.status(200).json({ user: user });
    } else res.status(400).send("Invalid Credentials");
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const logout = async (req, res) => {
  try {
    const user = await userModel.findOne({ where: { id: req.body.user_id } });
    user.update({
      token: null,
    });
    res.status(200).json({ message: "logged out successfully." });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

module.exports = {
  login,
  logout,
};
