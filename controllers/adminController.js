import UserModel from "../models/User.js";
import jwt from "jsonwebtoken";

class AdminController {
    
  static AdminLogin = async (req, res) => {
    const { email, password } = req.body;

    if (email == process.env.EMAIL && password == process.env.PASSWORD) {
      const token2 = jwt.sign({ email: email }, process.env.JWT_SECRET_KEY_2);
      res.cookie("access_token_admin", token2, {
        httpOnly: true,
      });
      return res.json({ status: "login successfull" });
    }

    res.json({ status: "error", error: "Invalid username/password" });
  };
  static getAll = async (req, res) => {
    try {
      const alldata = await UserModel.find({},{email:1});
      res.json(alldata);
    } catch {
      res.json(err);
    }
  };

  static adminLogout = function (req, res) {
    return res
      .clearCookie("access_token_admin")
      .status(200)
      .json({ message: "Admin logged out successfully 😏 🍀" });
  };

  static deleteUser = async (req, res) => {
    const email = req.body.email;
    await UserModel.deleteOne({ email });
    res.send(email +   "  deleted ");
  };
}

export default AdminController;
