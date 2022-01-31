const jwt = require("jsonwebtoken");
// eslint-disable-next-line no-undef
const dotenv = require("dotenv");
// get config vars
dotenv.config();

const verifyToken = (req, res, next) => {
  try {
    console.log(req.headers);
    const token = req.body.token || req.query.token || req.headers.token;

    if (!token) {
      return res
        .status(403)
        .json({ error: "A token is required for authentication" });
    }
    try {
      // eslint-disable-next-line no-undef
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
      req.user = decoded;
      console.log("decoded user is: ", req.user, decoded);
    } catch (err) {
      return res.status(401).json({ error: "Invalid Token" });
    }
    return next();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

module.exports = {
  verifyToken,
};
