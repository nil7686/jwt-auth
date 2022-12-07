import express from 'express';
const router = express.Router();
import UserController from '../controllers/userController.js';
import checkUserAuth from '../middlewares/auth-middleware.js';
import UserModel from "../models/User.js"
import jwt from 'jsonwebtoken'


// routes for signup(email,password)
router.post('/register', UserController.userRegistration)

//middleware for authentication
router.use('/update', checkUserAuth)

//route for further updates
router.patch('/update', async (req,res) => {
    const updatedStudent = await UserModel.findOneAndUpdate({email:req.user.email},{ name: req.body.name,
        new : true,
        runValidators : true
      })
    try{
        res.status(200).json({
            status : 'Success',
            data : {
              updatedStudent
            }
          })
    }catch(err){
        console.log(err)
    }
})

//logout user
router.put("/logout", checkUserAuth, function (req, res) {
  const authHeader = req.headers["authorization"];
  jwt.sign(authHeader, "", { expiresIn: 1 } , (logout, err) => {
  if (logout) {
    //jwtr.distroy(token)
  res.send({msg : 'You have been Logged Out' });
  } else {
  res.send({msg:'Error'});
  }
  });
  });
  




export default router