import mongoose from 'mongoose'

const connectDb = async (DATABASE_URL) =>{
    
        await mongoose.connect(DATABASE_URL, {
            useNewUrlParser: true, 
            useUnifiedTopology: true },
            () => {
                console.log("connected to database!!")
            })
        //console.log('connected sucessfully ...')
    }

export default connectDb