const removeCircularReferences = require('../config/removeCircularRefrences');
const userService = require('../services/user.service')

const getUserProfile = async (req, res) => {
    try {
        let jwt = req.headers.authorization?.split(' ')[1];
        if (!jwt && req.query.token) {
            jwt = req.query.token;
        }
        console.log("JWT:", jwt);

        if (!jwt) {
            return res.status(400).send({ error: 'Token unavailable' });
        }

        const user = await userService.getUserProfileByToken(jwt);
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }

        const userCopy = removeCircularReferences(user.toObject());
        return res.status(200).send(userCopy);
    } catch (error) {
        console.error('Error fetching user profile:', error);
        return res.status(500).send({ error: error.message });
    }
};

const getAllUsers = async(req,res)=>{
    try {

        const users = await userService.getAllUser()
        res.status(200).send(users)
        
    } catch (error) {
        return res.status(500).send({error:error.message})
    }
}


module.exports={getUserProfile,getAllUsers}