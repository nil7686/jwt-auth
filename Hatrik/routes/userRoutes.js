import express from 'express';
const router = express.Router();
import AdminController from '../controllers/AdminController.js';
import checkUserAuth from '../middlewares/auth-middleware.js';
import jwt from "jsonwebtoken"


// ROute Level Middleware - To Protect Route
router.use('/username', checkUserAuth)

// Public Routes
router.post('/Admin/AdminRegister', AdminController.AdminRegistration)

//add data
router.post('/Admin/Adminlogin',AdminController.addAdmin)
router.post('/Admin/CreateFacilites',AdminController.addFacility)
router.post('/Admin/CreateContractor',AdminController.addContractor)






export default router