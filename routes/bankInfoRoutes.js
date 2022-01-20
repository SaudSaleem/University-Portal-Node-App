var express = require('express');
var router = express.Router()
var middleware = require('../middlewares/test');
const bankInfoController = require('../controllers/bankInfoController');
// routes 
router.get('/', middleware.timeLog, bankInfoController.getBankInfo);
// router.get('/:id', middleware.timeLog, bankInfoController.getBankInfo);
router.post('/', middleware.timeLog, bankInfoController.addUserBankInfo);
//router.put('/:id', middleware.timeLog, bankInfoController.updateUser);
//router.delete('/:id', middleware.timeLog, bankInfoController.deleteUser);

// router.get('/getAll', bankInfoController.getUsers);
module.exports = router