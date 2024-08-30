const {Cashfree} = require("cashfree-pg");

const Order = require("../models/order.model");




async function initiatePaymentGateway(orderId){

   
    const order = await Order.findById(orderId)
    .populate('user')
    .populate({path:'orderItems',populate:{path:'product'}})
    .populate('shippingAddress')

   
    
    //parameters for CashFree API   
    // const order_amount = order.totalDiscountedPrice
    const order_amount = 10
    const order_currency = "INR"
    const customer_details = {
        customer_id:order.user._id,
        customer_name:order.user.name,
        customer_email:order.user.email,
        customer_phone:"9924253037"
    }
    const return_url = "https://vishal-mobiles.vercel.app/account/order/"

    
    Cashfree.XClientId = process.env.CASHFREE_CLIENT_ID;
    Cashfree.XClientSecret = process.env.API_KEY
    Cashfree.XEnvironment = Cashfree.Environment.PRODUCTION

    console.log(process.env.CASHFREE_CLIENT_ID)
    console.log(process.env.API_KEY)
    const request = {
        order_amount,
        order_currency,
        customer_details,
        order_meta:{
            return_url
        },
        order_note:""
    }


    try {
        const response = await Cashfree.PGCreateOrder("2023-08-01", request);
        console.log("PAYMENT INITIATION SUCCESSFUL");
  

 
    
    const data = response.data
    order.paymentDetails.paymentId = data.order_id
    await order.save()
    const orderDetails = {
        order:order,
        paymentData:data
    }

    console.log("check-data-delivery -->",orderDetails)

    return orderDetails
} catch (error) {
    console.error('Error during payment initiation:', error.response?.data || error.message);
    throw error; // Re-throw or handle the error
}
}


async function checkPaymentStatus(orderId){

    const url =`https://api.cashfree.com/pg/orders/${orderId}`

    const headers = {
        'accept': 'application/json',
        'x-api-version': '2023-08-01',
        'x-client-id':process.env.CASHFREE_CLIENT_ID,
        'x-client-secret': process.env.API_KEY
      };

    try {
      
        const response = await fetch(url,{method:'GET',headers:headers})
        if(!response.ok){
            throw new Error(`HTTP error : ${response.status}`)
        }
        const data = await response.json()
      
  
        return data
    } catch (error) {
        console.error('Error: ',error)
    }
    console.log("checking payment stauts ",data

    )
}

module.exports = {initiatePaymentGateway,checkPaymentStatus}