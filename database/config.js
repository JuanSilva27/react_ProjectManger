const mongoose = require("mongoose");
require("dotenv").config

const connectDB = async ()=>{
    try {
        const connection = await mongoose.connect(process.env.DB)
        const url = `${connection.connection.host}: ${connection.connection.port}`
        console.log(`MongoDB connected in ${url}`)
    } catch (error) {
        console.log(`error : ${error.message}`)
    }
}

module.exports = connectDB