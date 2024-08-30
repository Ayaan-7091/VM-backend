const Banner = require("../models/banner.model")

const addBannerImage= async(reqData)=>{

    const banner = new Banner({
        image:reqData.image,
    })

    return await banner.save()
}

const getBannerImage = async()=>{

const data = await Banner.find()
return data    

}

const deleteBannerImage = async(imageId)=>{
    const data = await Banner.findByIdAndDelete(imageId)
    return data
}


module.exports = {addBannerImage,getBannerImage,deleteBannerImage}