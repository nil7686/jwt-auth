      
import mongoose from 'mongoose'

const connectDb = async (DATABASE_URL) =>{
    try{
        const DB_OPTIONS ={
            dbName: "akashdb"
        }
        await mongoose.connect(DATABASE_URL, DB_OPTIONS)
        console.log('connected sucessfully ...')
    } catch(error){
        console.log('error coming out')
    }
}
export default connectDb
