const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'users'
    },
    cartItems:[{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'cartItems'
    }],
    totalPrice:{
        type:Number,
        default:0,
        required:true
    },
    totalItem:{
        type:Number,
        default:0,
        required:true
    },
    totalDiscountedPrice:{
        type:Number,
        default:0,
        required:true
    },
    discount:{
        type:Number,
        default:0,
        required:true
    },

})

const Cart = mongoose.model('cart',cartSchema)

module.exports=Cart