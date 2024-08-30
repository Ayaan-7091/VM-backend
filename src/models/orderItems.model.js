const mongoose = require('mongoose')

const orderItemsSchema = new mongoose.Schema({

    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'product',
        required:true
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
        ref:'users',
        required:true,
    },
    variant:{
     color:{
         type:String
     },
     imageUrl:{
         type:String
     },
    
    }

})

const OrderItems = mongoose.model('orderItems',orderItemsSchema)
module.exports = OrderItems