const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    brand:{
        type:String,
    },
    specifications:{
        warranty:{
            type:String,
        },
        ram:{
            type:String,
        },
        storage:{
            type:String,
        }
        
    },
    price:{
        type:Number,
        required:true
    },
    discountedPrice:{
        type:Number,
        required:true
    },
    discountPresent:{
        type:Number,
    },
    quantity:{
        type:String,
    },
    variants:[{
        color:{
            type:String
        },
        imageUrl:{
            type:String
        }
    }],

  
    ratings:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'ratings'
        }
    ],
    reviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'reviews'
        }
    ],

    numRatings:{
        type:Number,
        default:0
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        
        ref:'categories'
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }

})

const Product = mongoose.model('product',productSchema)
module.exports=Product