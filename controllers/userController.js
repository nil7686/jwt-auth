import UserModel from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class UserController {
  //function for user signup
  static userSignup = async (req, res) => {
    const { email, password ,name,mobile_number} = req.body;

    const user = await UserModel.findOne({ email: email });
    if (user) {
      res.send({ status: "failed", message: "Email already exists" });
    } else {
      if (email && password) {
        try {
          const salt = await bcrypt.genSalt(10); //bcryption passwords
          const hashPassword = await bcrypt.hash(password, salt);
          const doc = new UserModel({
            email: email,
            password: hashPassword,
            name:name,
            mobile_number:mobile_number
          });
          await doc.save();

          res
            .status(201)
            .send({ status: "success", message: "Registration Successfull" });
        } catch (error) {
          console.log(error);
          res.send({ status: "failed", message: "Unable to Register" });
        }
      } else {
        res.send({ status: "failed", message: "All fields are required" });
      }
    }
  };

  // function for user logout
  static Logout = function (req, res) {
    return res
      .clearCookie("access_token")
      .status(200)
      .json({ message: "Successfully logged out 😏 🍀" });
  };

  //function for user login
  static userLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
      if (email && password) {
        const user = await UserModel.findOne({ email: email });
        if (user != null) {
          const isMatch = await bcrypt.compare(password, user.password);
          if (user.email === email && isMatch) {
            // Generate JWT Token

            const saved_user = await UserModel.findOne({ email: email });
            // Generate JWT Token
            const token = jwt.sign(
              { userID: saved_user._id },
              process.env.JWT_SECRET_KEY,
              { expiresIn: "1d" }
            );

            res.cookie("access_token", token, {
              httpOnly: true,
            });
            res.send( "welcome " + email);
          
          } else {
            res.send({
              status: "failed",
              message: "Email or Password is not Valid",
            });
          }
        } else {
          res.send({
            status: "failed",
            message: "You are not a Registered User",
          });
        }
      } else {
        res.send({ status: "failed", message: "All Fields are Required" });
      }
    } catch (error) {
      console.log(error);
      res.send({ status: "failed", message: "Unable to Login" });
    }
  };

  //function for name update

  static updateName = async (req, res) => {
    const updatedStudent = await UserModel.findOneAndUpdate(
      { email: req.user.email},
      {
        name: req.body.name,
        mobile_number: req.body.mobile_number,
        // new : true,
        // runValidators : true,
      },
      { projection: { password: 0 } }
    );

    if (!req.body.name) {
      res.send("please insert name");
    }

    try {
      res.status(200).json({
        status: "Success",
        data: {
          updatedStudent,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  //function for  user imageUpload

  static imageUpload = async (req, res) => {
    const updatedStudent = await UserModel.findOneAndUpdate(
      { email: req.user.email },
      { image: req.file.path, new: true, runValidators: true },
      { projection: { password: 0 } }
    );
    try {
      res.status(200).json({
        status: "Success",
        data: {
          updatedStudent,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };
  static deleteAccount = async (req, res) => {
    const email = req.user.email;
    await UserModel.deleteOne({ email });
    res.send("Account deleted ");
  };
 
}

export default UserController;
