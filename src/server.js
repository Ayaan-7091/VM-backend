const app = require('.');
const { connectDB } = require('./config/db');

const PORT = 5454;

app.listen(PORT,async()=>{
    await connectDB()
    console.log("SERVER LISTENING TO PORT : ",PORT)
})


app.get('/',(req,res)=>{
    res.status(200).send({message:"WELCOME TO VISHAL MOBILES",status:true})
})