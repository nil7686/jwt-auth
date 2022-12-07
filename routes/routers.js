import  express  from "express";
//import './models/Students.js'
import StudentModel from "../models/signup.js";

const routers = express.Router();

const studentModel = StudentModel;

// get all data

routers.get("/get", async(req,res)=>{
    try{
        const student = await studentModel.find();
        res.json(student);
    }
    catch{res.json(err);
    }
    
})


//find by id 

routers.get("/:studentId", async(req,res)=>{
  const courseId = req.params.courseId;
  try{
 const student =  await studentModel.findById(courseId)
 res.json(student);
  }
  catch{res.json(error);
  }
    
});

routers.get("/getcookie", async(req,res)=>{
  console.log(req.cookies);
  
})


// enter userdetails into database 

routers.post("/post", async(req,res)=>{
 const student =  await studentModel.create(req.body)
 const mail = req.body.email
 console.log(mail)
 res.cookie("email",mail)
 res.json(student);
    
})

routers.patch('/update/:id', async (req,res) => {
  const updatedStudent = await StudentModel.findByIdAndUpdate(req.params.id,req.body,{
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



/*routers.patch('/update/:id', async (req,res) => {
  const updatedStudent = await studentModel.findByIdAndUpdate(req.params.id,req.body,{
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
  } */
})
export default routers;