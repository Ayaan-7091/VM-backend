const {initiatePaymentGateway} = require("../services/payment.service")


const initiatePaymentGatewayController = async(req,res)=>{
    

    try {    
        const data = await initiatePaymentGateway(req.params.id)
        res.status(200).send(data)
    } catch (error) {
        res.status(500).send({error:error.message})
    }
}


module.exports = {initiatePaymentGatewayController}