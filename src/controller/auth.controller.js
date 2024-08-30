const userService = require('../services/user.service.js')
const cartService = require('../services/cart.service.js')
const jwtProvider = require('../config/jwtProvider.js')
const bcrypt = require('bcryptjs')


const register = async(req,res)=>{
    try {

        const user = await userService.createUser(req.body)
        const jwt = jwtProvider.generateToken(user._id)

       const cart = await cartService.createCart(user)

        // Associate the created cart with the user object
    user.cart = cart._id;
    await user.save(); // Save the updated user with cart ID
        
        return res.status(200).send({message:"User created",jwt})
        
    } catch (error) {
        return res.status(500).send({error:error.message})
    }
   
}

const login = async(req,res)=>{
    const {password,email} = req.body
    try {
        
        const user = await userService.findUserByEmail(email)

        if(!user){
            return res.status(404).send({message:'User not found with email : ',email})
        }

        const isPasswordValid = await bcrypt.compare(password,user.password)

        if(!isPasswordValid){
            return res.status(401).send({message:'Invalid Password'})
        }

        const jwt = jwtProvider.generateToken(user._id)
        return res.status(200).send({jwt,message:"Login Successful"})

    } catch (error) {
        return res.status(500).send({error:error.message})
    }
}

module.exports={register,login}