const { findByIdAndDelete, findById } = require('../models/user.model')
const userService = require('../services/user.service')
const CartItem = require('../models/cartItem.model')


async function updateCartItem(userId,cartItemId,cartItemData){

    try {
        const item = await findCartItemById(cartItemId)

        if(!item){
            throw new Error("Item not found")
        }

        const user = await userService.findUserById(item.userId)

        if(!user){
            throw new Error("user not found",userId) 
        }

        if(user._id.toString() === userId.toString() ){
            item.quantity = cartItemData.quantity
            item.price = item.quantity*item.product.price
            item.discountedPrice = item.quantity*item.product.discountedPrice
        
            const updateCartItem =await item.save()
            return updateCartItem
        }
        else{
            throw new Error("Unable to update the cart item : user mismatch")
        }

    } catch (error) {
        throw new Error(error.message)
    }
}

async function removeCartItem(userId,cartItemId){

    const cartItem =await findCartItemById(cartItemId)

    const user = await userService.findUserById(userId)

    if(user._id.toString() === cartItem.userId.toString()){
        await CartItem.findByIdAndDelete(cartItemId)
    }
    else{
        throw new Error("Unable to delete cart item : user mismatch")
    }
}

async function findCartItemById(cartItemId){

    const cartItem = await CartItem.findById(cartItemId).populate("product")

    if(cartItem){
        return cartItem
    }
    else{
        throw new Error("CartItem not found !")
    }
}

module.exports={
    findCartItemById,updateCartItem,removeCartItem
}