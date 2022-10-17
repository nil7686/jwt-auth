import jwt from "jsonwebtoken";
import UserModel from "../models/User.js";
import multer from "multer";

// imported in middleware
var checkUserAuth = async (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res
      .status(403)
      .send({ status: "failed", message: "please login first..." });
  }
  try {
    const { userID } = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Get User from Token
    req.user = await UserModel.findById(userID).select("-password"); // return all data fields except password

    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({ status: "failed", message: "Unauthorized User" });
  }
};

var checkAdminAuth = async (req, res, next) => {
  const token2 = req.cookies.access_token_admin;
  if (!token2) {
    return res
      .status(403)
      .send({ status: "failed", message: "please login first..." });
  }
  try {
    jwt.verify(token2, process.env.JWT_SECRET_KEY_2);

    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({ status: "failed", message: "Unauthorized User" });
  }
};

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./images");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
var imageUpload = multer({ storage: storage });
export { checkUserAuth, imageUpload, checkAdminAuth };
