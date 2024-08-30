const express = require('express')
const router = express.Router()

const orderController = require('../controller/adminOrder.controller')
const authenticate = require('../middleware/authenticate')


router.get("/",authenticate,orderController.getAllOrders)
router.put("/:orderId/confirmed", authenticate,orderController.confirmOrder)
router.put("/:orderId/shipped", authenticate,orderController.shippedOrder)
router.put("/:orderId/delivered", authenticate,orderController.deliveredOrder)
router.put("/:orderId/cancel", authenticate,orderController.cancelOrder)
router.put("/:orderId/delete", authenticate,orderController.deleteOrder)


module.exports = router
