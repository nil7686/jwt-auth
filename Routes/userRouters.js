import express from 'express' 
import uploadImage from "../Controllers/userController.js";
import upload from '../middlewares/middleware.js';


const routers = express.Router();

routers.post('/upload',upload, uploadImage.uploadfunction);


export default routers