
//const mongoose = require("mongoose") // new
import mongoose from 'mongoose'
// Connect to MongoDB database
const connectDB = (db_url) => {
    return mongoose.connect(db_url).then(() => {
        console.log("connected sucessfully");
    }).catch((err) => {
        console.log(err)
    })
}
export default connectDB
