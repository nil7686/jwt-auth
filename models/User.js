import mongoose  from "mongoose";

// defining schema

const userSchema = new mongoose.Schema({
    
    email: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    name: {type: String,  trim: true}
    
  })
  
  // Model
  const UserModel = mongoose.model("user", userSchema)
  
  export default UserModel
  //Footer
  