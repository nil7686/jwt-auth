import express from 'express' 
import verify from "../Controllers/userController.js";

const routers = express.Router();

routers.post('/signup', verify.signUp);

routers.post('/verify', verify.verifyOtp)

export default routers