var express = require('express');
var router = express.Router()
var middleware = require('../middlewares/test');
const orderController = require('../controllers/orderController');
// routes 
router.get('/', middleware.timeLog, orderController.getOrderInfo);
router.post('/', middleware.timeLog, orderController.addOrderInfo);
// UserOrder routes
router.post('/placeOrder', middleware.timeLog, orderController.assignOrder);
router.get('/getPlaceOrder', middleware.timeLog, orderController.getUserOrder);
router.post('/getSpecificUserOrder', middleware.timeLog, orderController.getSpecificUserOrder);



module.exports = router