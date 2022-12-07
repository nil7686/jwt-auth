import UserModel from "../models/User.js"
import bcrypt from "bcrypt"
import  jwt  from "jsonwebtoken"


class UserController {
  
    static userRegistration = async (req, res) => {
      const {  email, password  } = req.body
      const user = await UserModel.findOne({ email: email })
      if (user) {
        res.send({ "status": "failed", "message": "Email already exists" })
      } else {
        if ( email && password ) {
          
            try {
              const salt = await bcrypt.genSalt(10)  //bcryption passwords
              const hashPassword = await bcrypt.hash(password, salt)
              const doc = new UserModel({
                
                email: email,
                password: hashPassword,
                
              })
              await doc.save()
              const saved_user = await UserModel.findOne({ email: email })
              // Generate JWT Token
             const token = jwt.sign({ userID: saved_user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' })
              res.status(201).send({ "status": "success", "message": "Registration Success", "token": token })
            } catch (error) {
              console.log(error)
              res.send({ "status": "failed", "message": "Unable to Register" })
          }
        
        } else {
          res.send({ "status": "failed", "message": "All fields are required" })
        }
      }
    }



}
export default UserController