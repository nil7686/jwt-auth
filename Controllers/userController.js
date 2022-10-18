
//import UserModel from "../Model/userModel.js"


class uploadImage{

 static uploadfunction = async(req,res) => {

    console.log(req.file.path) // file ki sari info console pe aa jaegyi
  res.json({messagge :'uploaded'})

 }
 
}

export default uploadImage;
