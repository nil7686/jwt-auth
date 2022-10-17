import express from "express";
const router = express.Router();
import UserController from "../controllers/userController.js";
import {
  checkUserAuth,
  imageUpload,
} from "../middlewares/userAuthMiddleware.js";

router.post("/userSignup", UserController.userSignup);

router.post("/userLogin", UserController.userLogin);

router.patch("/updateName",checkUserAuth, UserController.updateName);

// For Single image upload
router.patch(
  "/uploadImage",checkUserAuth,
  imageUpload.single("image"),
  UserController.imageUpload
);

router.post("/userLogout", checkUserAuth, UserController.Logout);

router.delete("/deleteAccount",checkUserAuth,UserController.deleteAccount)



export default router;
