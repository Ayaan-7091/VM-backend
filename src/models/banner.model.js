const mongoose = require('mongoose')

const bannerSchema = new mongoose.Schema({

    image:{
        type:String
    }
   

})

const Banner = mongoose.model('banner',bannerSchema)

module.exports = Banner