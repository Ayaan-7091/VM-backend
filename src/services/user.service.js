const User = require('../models/user.model')
const bcrypt = require('bcryptjs')
const jwtProvider = require('../config/jwtProvider.js')

const createUser = async(userData)=>{

    try{
    let {name,email,password} = userData

    const isUserExist = await User.findOne({email})

    if(isUserExist){
        throw new Error("User already exist with email :",email)
    }

    password = await bcrypt.hash(password,8)

    const user = await User.create({name,email,password})

    console.log("User created : ",user)

    return user;

    }
    catch(error){
        throw new Error(error.message)
    }
}

const findUserById =async(userId) =>{

    try{

        const user = await User.findById(userId).populate('address')
   
        await user.save()

        if(!user){
            throw new Error("User not found with ID : ",userId)
        }
        return user
    }
    catch(error){
        throw new Error(error.message)
    }
}

const findUserByEmail = async (email) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error(`User not found with email: ${email}`);
        }
        return user;
    } catch (error) {
        throw new Error(error.message);
    }
};

const getUserProfileByToken = async(token)=>{
    try {

        const userId = jwtProvider.getUserIdFromToken(token)

        const user = await User.findById(userId).populate('address')
     
        await user.save()


        if(!user){
            throw new Error("User not found")
        }
        return user 
        
    } catch (error) {

        throw new Error(error.message)
        
    }
}

const getAllUser= async()=>{
    try {
        const users = await User.find()
        return users

    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports = {createUser,findUserById,findUserByEmail,getUserProfileByToken,getAllUser}