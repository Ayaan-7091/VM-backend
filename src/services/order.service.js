const cartService = require('../services/cart.service')
const Address = require('../models/address.model')
const Order = require('../models/order.model')
const OrderItem = require('../models/orderItems.model')
const { checkPaymentStatus } = require('./payment.service')



async function createOrder(user,shippingAddress){

    
    let address

    if(shippingAddress._id){
        let addressExists = await Address.findById(shippingAddress._id)
        address = addressExists
    }
    else{
        address =new Address(shippingAddress)
        address.user = user._id;
        
    
        await address.save()

        user.address.push(address)
        await user.save()
    }

    const cart =await cartService.findUserCart(user._id)
    const orderItems = []
    console.log(cart)
 


    for(const item of cart.cartItems){
   

        const orderItem = new OrderItem({
            price:item.price,
            variant:item.variant,
            product:item.product,
            quantity:item.quantity,
            userId:item.userId,
            discountedPrice:item.discountedPrice,
           

        })

        const createdOrderItem =await orderItem.save()
        console.log("Check order item : ",createdOrderItem)
        orderItems.push(createdOrderItem)
    }

    const createdOrder = new Order({
        user,
        orderItems,
        totalPrice:cart.totalPrice,
        totalDiscountedPrice:cart.totalDiscountedPrice,
        discount:cart.discount,
        totalItem:cart.totalItem,
        shippingAddress:address

    })

    const saveOrder = await createdOrder.save()
    console.log(saveOrder)
    return saveOrder

}

async function placeOrder(orderId){

    const order =await findOrderById(orderId)

    order.orderStatus="PLACED"
    order.paymentDetails.status="COMPLETED"

    return await order.save()
}

async function confirmOrder(orderId){

    const order =await findOrderById(orderId)

    order.orderStatus="CONFIRMED"

    return await order.save()
}


async function shippedOrder(orderId){

    const order =await findOrderById(orderId)

    order.orderStatus="SHIPPED"

    return await order.save()
}


async function deliveredOrder(orderId){

    const order =await findOrderById(orderId)

    order.orderStatus="DELIVERED"

    return await order.save()
}


async function cancelOrder(orderId){

    const order =await findOrderById(orderId)

    order.orderStatus="CANCELED"

    return await order.save()
}

async function findOrderById(orderId){

    const order = await Order.findById(orderId)
    .populate('user')
    .populate({path:'orderItems',populate:{path:'product'}})
    .populate('shippingAddress')



    return order
}

async function userOrderHistory(userId){
    try {
        const orders = await Order.find({user:userId})
        .populate({path:'orderItems',populate:{path:'product'}})

        for(let order of orders){
        if(order.orderStatus=='PENDING'){
          const data = await checkPaymentStatus(order.paymentDetails.paymentId)
          console.log("check data",data)
          console.log(order.paymentDetails.paymentId)
          order.paymentDetails.paymentStatus=data.order_status
          if(order.paymentDetails.paymentStatus=="PAID"){
          order.orderStatus='PLACED'
          }
          order.save()
        }
        }
        return orders
    } catch (error) {
        throw new Error(error.message)
    }
}

async function getAllOrders(){
   
    const orders = await Order.find()
    .populate({path:'orderItems',populate:{path:'product'}}).lean()



    return orders
    
}

async function deleteOrder(orderId){
    const order = await findOrderById(orderId)
    await Order.findByIdAndDelete(order._id)
    return  order
}


module.exports={createOrder,confirmOrder,placeOrder,cancelOrder,deleteOrder,shippedOrder,getAllOrders,userOrderHistory,deleteOrder,findOrderById,deliveredOrder}
