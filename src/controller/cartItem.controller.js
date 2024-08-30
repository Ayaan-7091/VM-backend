const cartITemService = require('../services/cartItem.service')

const updateCartItem = async(req,res)=>{

    const user =await req.user

    try {
        const updatedCartItem = await cartITemService.updateCartItem(user._id,req.params.id,req.body)
        return res.status(200).send(updatedCartItem)
    } catch (error) {
         return res.status(500).send({error:error.message})
    }
}

const removeCartItem = async(req,res)=>{

    const user =await req.user

    try {
        const updatedCartItem = await cartITemService.removeCartItem(user._id,req.params.id)
        return res.status(200).send("Item removed from the cart !")
    } catch (error) {
         return res.status(500).send({error:error.message})
    }
}


module.exports = {updateCartItem,removeCartItem}


