const { addBannerImage, getBannerImage, deleteBannerImage } = require("../services/banner.service")

const addBannerImageController = async(req,res) =>{

    try {
        
        const data = await addBannerImage(req.body)
        return res.status(201).send(data)

    } catch (error) {
        return res.status(500).send({error:error.message})
    }

}

const getBannerImageController = async(req,res) =>{

    try {
        
        const data = await getBannerImage()
        return res.status(201).send(data)
    } catch (error) {
        return res.status(500).send({error:error.message})
    }
}


const deleteBannerImageController = async(req,res)=>{

    try{
        const imageId = req.params.imageId
        const data = await deleteBannerImage(imageId)
        return res.status(201).send(data)
    }

 catch (error) {
    return res.status(500).send({error:error.message})
}

}


module.exports = {addBannerImageController,getBannerImageController,deleteBannerImageController}