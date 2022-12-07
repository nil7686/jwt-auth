

import  express  from "express";

import userControllers from "../controllers/Admincontroller.js";

const routers = express.Router();



// get all data
routers.get("/get", userControllers.getdata)
//add data
routers.post('/Admin/Adminlogin',userControllers.addAdmin)
routers.post('/Admin/CreateFacilites',userControllers.addFacility)
routers.post('/Admin/CreateContractor',userControllers.addContractor)



export default routers;