const adminModel = require("../models").Admin;

// add/post new user in user tablez
const addAdmin = async (req, res) => {
  try {
    const addedAdmin = await adminModel.create({
      admin_first_name: req.body.admin_first_name,
      admin_last_name: req.body.admin_last_name,
      admin_email: req.body.admin_email,
      admin_password: req.body.admin_password,
      admin_address: req.body.admin_address,
      admin_phone_no: req.body.admin_phone_no,
    });
    res.status(201).send(addedAdmin);
  } catch (error) {
    if (error.errors && error.errors[0].type == "unique violation") {
      res
        .status(400)
        .json({ error: "This email already exist.Try another email" });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

//return all admins
const getAllAdmins = async (req, res) => {
  try {
    let admins = await adminModel.findAll();
    res.status(200).send(admins);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//return only one admin based on given "ID"
const getAdminById = async (req, res) => {
  try {
    let admin = await adminModel.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!admin) res.status(404).send("Admin with given id is not found!");
    else res.status(200).send(admin);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// update admin in admin table
const updateAdmin = async (req, res) => {
  //check if admin exist
  try {
    let admin = await adminModel.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!admin) {
      res.status(404).send("Admin with given id is not found!");
      return;
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
  try {
    await adminModel.update(
      {
        admin_first_name: req.body.admin_first_name,
        admin_last_name: req.body.admin_last_name,
        admin_email: req.body.admin_email,
        admin_password: req.body.admin_password,
        admin_address: req.body.admin_address,
        admin_phone_no: req.body.admin_phone_no,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(201).send("Admin updated");
  } catch (error) {
    if (error.errors && error.errors[0].type == "unique violation") {
      res
        .status(400)
        .json({ error: "This email already exist.Try another email" });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

// delete admin from user table
const deleteAdmin = async (req, res) => {
  //check if admin exist
  let admin = await adminModel.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!admin) {
    res.status(404).send("Admin with given id is not found!");
    return;
  }
  await adminModel.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.status(200).send("admin deleted");
};

module.exports = {
  addAdmin,
  getAllAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin,
};
