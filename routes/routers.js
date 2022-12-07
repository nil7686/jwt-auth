
import  express  from "express";
//import './models/Students.js'
import StudentModel from "../models/AllStudents.js";

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
routers.get("/:studentId", async(req,res)=>{   //student id come from client side or from url 
  const courseId = req.params.courseId;
  try{
 const student =  await studentModel.findById(courseId)
 res.json(student);
  }
  catch{res.json(error);
  }
    
});

//login user  or get data from database
app.post('/api/login', async (req, res) => {
	const { username, password } = req.body                //store data comming from client into variables
	const user = await User.findOne({ username }).lean()          //username k behalf pe database mai search krege

	if (!user) {
		return res.json({ status: 'error', error: 'Invalid username/password' })
	}

	if (await bcrypt.compare(password, user.password)) {              // client ne deya password or apna databse wala encrypt  hua password match krege
		// the username, password combination is successful

		const token = jwt.sign(             //ek token generate krege or tokken ko id or username sign krege
			{
				id: user._id,
				username: user.username
			},
			JWT_SECRET                 // ek secret key bnani pdti hai or kisi se bhi share nhi krte   const JWT_SECRET  = 'yt6&^ohGYTdgr545432v7%^%#ferfy' or token ko verify bhi secret key se hi kiya jata hai
		)

		return res.json({ status: 'ok', data: token })
	}

	res.json({ status: 'error', error: 'Invalid username/password' })
})


// enter data into database
routers.post("/post", async(req,res)=>{
 const student =  await studentModel.create(req.body)
 res.json(student);
    
})

// enter data into database a registration form

routers.post('/register', async (req, res) => {
	const { username, password: plainTextPassword } = req.body     // storing data into variables coming from client side

	if (!username || typeof username !== 'string') {
		return res.json({ status: 'error', error: 'Invalid username' })
	}

	if (!plainTextPassword || typeof plainTextPassword !== 'string') {
		return res.json({ status: 'error', error: 'Invalid password' })
	}

	if (plainTextPassword.length < 5) {
		return res.json({
			status: 'error',
			error: 'Password too small. Should be atleast 6 characters'
		})
	}

	const password = await bcrypt.hash(plainTextPassword, 10)    // encrypt password into hash

	try {
		const response = await User.create({
			username,
			password
		})
		console.log('User created successfully: ', response)
	} catch (error) {
		if (error.code === 11000) {
			// duplicate key
			return res.json({ status: 'error', error: 'Username already in use' })
		}
		throw error
	}

	res.json({ status: 'ok' })
})

//routers.delete("/:studentId", async(req,res)=>{
  //  try{
    //    await   studentModel.remove({_id:req.params.stdendId})
      //  res.status(200).json({message:"done"});
   // }
    //catch(err){
      //  res.json(error);
    //}
    
//});

//delete a object
routers.delete('/delete/:id', async (req,res) => {
    const id = req.params.id
    await studentModel.findByIdAndRemove(id).exec()
    res.send('Deleted')
})

//update
routers.patch('/update/:id', async (req,res) => {
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
    }
})







export default routers;