const contactInfoModel = require("../models").contactInfo;
// / add/post new user in user tablez
const addUserContactInfo = async (req, res) => {
    try{
      const _contactInfo = await contactInfoModel.create({
        phoneNo: req.body.phoneNo,
        type: req.body.type,
        userId: req.body.userId,
      });
      res.status(201).send(_contactInfo);
    }
    catch (e) {
        if (e.name === "SequelizeValidationError") {
          return res.status(400).json({
            success: false,
            msg: e.errors.map((err) => err.message),
          });
        } else if (!e.status) {
          console.log("error",e)
          res
            .status(500)
            .json({
              error: {
                code: "UNKNOWN_ERROR",
                message: "An unknown error occurred.",
              },
            });
        } else {
          res
            .status(e.status)
            .json({ error: { code: e.code, message: e.message } });
        }
      }
};
//get bank details
const getContactInfo = async (req, res) => {
      const _contactInfo = await contactInfoModel.findAll();
      res.status(200).send(_contactInfo);
};

module.exports = {
    addUserContactInfo,
    getContactInfo
  };
  