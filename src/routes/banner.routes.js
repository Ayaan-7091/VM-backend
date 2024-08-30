const express = require('express')
const router = express.Router()

const bannerController =  require('../controller/banner.controller')

router.post('/addImage',bannerController.addBannerImageController)
router.get('/image',bannerController.getBannerImageController)
router.put('/:imageId/delete',bannerController.deleteBannerImageController)


module.exports = router