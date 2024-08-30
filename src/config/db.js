const mongoose = require('mongoose')

const mongodbUrl = "mongodb+srv://ayaan:kHo05oX6TQATjIqs@project1.60aq8hz.mongodb.net/?retryWrites=true&w=majority&appName=PROJECT1"

const connectDB = () =>{
    return mongoose.connect(mongodbUrl)
}

module.exports = {connectDB}