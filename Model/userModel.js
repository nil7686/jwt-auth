import mongoose  from "mongoose";
import  jwt  from "jsonwebtoken"


// defining schema

const userSchema = new mongoose.Schema({
    number: { type: String, 
        required: true 
    }
},{timestamps: true});

userSchema.methods.generateJWT = function () {
    const token = jwt.sign({
        _id: this._id,
        number: this.number
    },process.env.JWT_SECRET_KEY,{expiresIn: "7d"})
}
  
  // Model
  const UserModel = mongoose.model("user-otp", userSchema)
  
  export default UserModel
  