const mongoose = require('mongoose')

const cartItemSchema = new mongoose.Schema({

    cart:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'cart',
        required:true
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'product',
        required:true
    },
   variant:{
    color:{
        type:String
    },
    imageUrl:{
        type:String
    },
   
   },
    quantity:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    discountedPrice:{
        type:Number,
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'users'
    },
   
})

const CartItem = mongoose.model('cartItems',cartItemSchema)

module.exports=CartItem

