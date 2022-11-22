import mongoose  from "mongoose";



// defining schema

const userSchema = new mongoose.Schema({
    number: { type: String, 
        required: true 
    },
    otp: { type: String, 
        required: true 
    
},
    createdAt:{type:Date, default: Date.now, index : {expires :300}}
},
    {timestamps: true});


  
  // Model
  const OtpModel = mongoose.model("otp", userSchema)
  
  export default OtpModel
  //Footer