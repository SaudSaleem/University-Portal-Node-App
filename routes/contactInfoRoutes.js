var express = require('express');
var router = express.Router()
var middleware = require('../middlewares/test');
const contactInfoController = require('../controllers/contactInfoController');
// routes 
router.get('/', middleware.timeLog, contactInfoController.getContactInfo);
// router.get('/:id', middleware.timeLog, contactInfoController.getBankInfo);
router.post('/', middleware.timeLog, contactInfoController.addUserContactInfo);
//router.put('/:id', middleware.timeLog, contactInfoController.updateUser);
//router.delete('/:id', middleware.timeLog, contactInfoController.deleteUser);

// router.get('/getAll', contactInfoController.getUsers);
module.exports = router