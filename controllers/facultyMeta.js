const facultyMetaModel = require("../models").FacultyMeta;

//return all faculties meta
const getAllFacultiesMeta = async (req, res) => {
  try {
    let faculties = await facultyMetaModel.findAll();
    res.status(200).send(faculties);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// add new meta record of faculty
const addFacultyMeta = async (req, res) => {
  //input validation for post data
  try {
    const record = await facultyMetaModel.create({
      faculty_id: req.body.faculty_id,
      user_id: req.body.user_id,
    });
    res.status(201).send(record);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// update meta record of faculty
const updateFacultyMeta = async (req, res) => {
  try {
    //check if record exist
    let user = await facultyMetaModel.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!user) {
      res.status(404).send("User with given id is not found!");
      return;
    }
    const updatedRecord = await facultyMetaModel.update(
      {
        faculty_id: req.body.faculty_id,
        user_id: req.body.user_id,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(201).send(updatedRecord);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// delete meta record of faculty
const deleteFacultyMeta = async (req, res) => {
  try {
    //check if faculty exist
    let faculty = await facultyMetaModel.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!faculty) {
      res.status(404).send("faculty with given id is not found!");
      return;
    }
    await facultyMetaModel.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).send("faculty deleted successfully");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllFacultiesMeta,
  addFacultyMeta,
  updateFacultyMeta,
  deleteFacultyMeta,
};
