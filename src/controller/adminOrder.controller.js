const orderService = require('../services/order.service')


const getAllOrders = async(req,res)=>{

    try {
    
        const orders = await orderService.getAllOrders()
    console.log(orders)
        return res.status(200).send(orders)
            
    } catch (error) {
        return res.status(500).send({error:error.message})        
    }
}

const confirmOrder = async(req,res)=>{
    const orderId = req.params.orderId
    try {
        const orders = await orderService.confirmOrder(orderId)
        return res.status(200).send(orders)

    } catch (error) {
        return res.status(500).send({error:error.message})        
    }
}

const shippedOrder = async(req,res)=>{
    const orderId = req.params.orderId
    try {
        const orders = await orderService.shippedOrder(orderId)
        return res.status(200).send(orders)

    } catch (error) {
        return res.status(500).send({error:error.message})        
    }
}

const deliveredOrder = async(req,res)=>{
    const orderId = req.params.orderId
    try {
        const orders = await orderService.deliveredOrder(orderId)
        return res.status(200).send(orders)

    } catch (error) {
        return res.status(500).send({error:error.message})        
    }
}

const cancelOrder = async(req,res)=>{
    const orderId = req.params.orderId
    try {
        const orders = await orderService.cancelOrder(orderId)
        return res.status(200).send(orders)

    } catch (error) {
        return res.status(500).send({error:error.message})        
    }
}

const deleteOrder = async(req,res)=>{
    const orderId = req.params.orderId
    try {
        const orders = await orderService.deleteOrder(orderId)
        return res.status(200).send(orders)

    } catch (error) {
        return res.status(500).send({error:error.message})        
    }
}

module.exports = {
    getAllOrders,
    confirmOrder,
    deleteOrder,
    cancelOrder,
    shippedOrder,
    deliveredOrder
}
