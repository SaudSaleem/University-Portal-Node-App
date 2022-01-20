const orderModel = require("../models").order;
const usersModel = require("../models").User;
const UserOrder = require("../models").UserOrder;
// / add/post new user in user tablez
const addOrderInfo = async (req, res) => {
  try {
    const _contactInfo = await orderModel.create({
      orderName: req.body.orderName,
      type: req.body.type,
    });
    res.status(201).send(_contactInfo);
  } catch (error) {
    res.status(400).json({ error: error.toString() });
  }
};
//get bank details
const getOrderInfo = async (req, res) => {
  try {
    const _contactInfo = await orderModel.findAll();
    res.status(200).send(_contactInfo);
  } catch (error) {
    res.status(400).json({ error: error.toString() });
  }
};
//get bank details
const assignOrder = async (req, res) => {
  try {
    let user = await usersModel.findByPk(req.body.userId);
    let order = await orderModel.findByPk(req.body.orderId);
    await order.addUser(user);
    res.status(200).json({ message: "User Added To Company Successfully" });
  } catch (error) {
    res.status(400).json({ error: error.toString() });
  }
};


//UserOrder Routes
const getUserOrder= async (req, res) => {
  try {
    console.log("UserOrder",UserOrder)
    const _UserOrder = await UserOrder.findAll();
    res.status(200).send(_UserOrder);
  } catch (error) {
    res.status(400).json({ error: error.toString() });
  }
};

//get bank details
const getSpecificUserOrder= async (req, res) => {
  try {
    let user = await usersModel.findByPk(req.body.userId);
   let data = await user.getOrders();
    res.status(200).send(data);
  } catch (error) {
    res.status(400).json({ error: error.toString() });
  }
};

module.exports = {
  addOrderInfo,
  getOrderInfo,
  assignOrder,
  getUserOrder,
  getSpecificUserOrder
};
