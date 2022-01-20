const bankInfoModel = require("../models").bankInfo;
// / add/post new user in user tablez
const addUserBankInfo = async (req, res) => {
  try{
      const _bankInfo = await bankInfoModel.create({
        bankName: req.body.bankName,
        accountNo: req.body.accountNo,
        userId: req.body.userId,
      });
      res.status(201).send(_bankInfo);
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
const getBankInfo = async (req, res) => {
      const _bankInfo = await bankInfoModel.findAll();
      res.status(200).send(_bankInfo);
};

module.exports = {
    addUserBankInfo,
    getBankInfo
  };
  