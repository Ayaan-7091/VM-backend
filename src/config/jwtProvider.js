const jwt = require('jsonwebtoken')

//any random string as key
const KEY = '462dff03e4fcfe3361e06bd7b5f99909666e05d8'

const generateToken=(userId)=>{
    const token = jwt.sign({userId},KEY,{expiresIn:'48h'})
    return token
}

const getUserIdFromToken=(token)=>{
    const decodedToken = jwt.verify(token,KEY)
    return decodedToken.userId
}

module.exports = {generateToken,getUserIdFromToken}