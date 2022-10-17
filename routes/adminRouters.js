import express from "express";
const router = express.Router();
import AdminController from "../controllers/adminController.js";
import {checkAdminAuth} from "../middlewares/adminAuthMiddleware.js"

router.post("/adminLogin", AdminController.AdminLogin);
router.get("/getAllUser", checkAdminAuth, AdminController.getAll);
router.delete("/deleteUser", checkAdminAuth, AdminController.deleteUser);
router.post("/adminLogout", checkAdminAuth, AdminController.adminLogout);

export default router;
