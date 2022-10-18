import multer from 'multer';
//import connectDb from './connection/connectiondb.js'

const storage = multer.diskStorage({

    //destination for store image
    destination: function (req, file, cb) {    //isme hm request,file, or callback fun denge
      cb(null, './Images') // .lgana pdta hai path mai
    },
    //file ka naam set krege
    filename: function (req, file, cb) {
     // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)  //extra functionalites
      //cb(null, file.fieldname + '-' + uniqueSuffix)
      cb(null, Date.now()+file.originalname)  // original name rkege
    }
  })

  //check filter in multer documentation 
  const fileFilter = (req, file, cb) =>{

    if(file.mimetype === 'image/png'|| file.mimetype === 'image/jpg'|| file.mimetype === 'image/jpeg'){
        // To accept the file pass `true`, like so:
    cb(null, true)
    }
    else{
        // To reject this file pass `false`, like so:
    //cb(null, false)
    cb(new Error('I don\'t have a clue!'))
    }
  
  
  }
  //storage function ko yaha pr use kr leya
  const upload = multer({ storage: storage ,
    limits:{
        fileSize: 1024*1024*5  //limit only 5 mb tak upload hogi
    },
    fileFilter:fileFilter
}).single('profile_pic') 

//const upload  = multer({dest:'Images/'})   simply use krne k leye destination de do folder ki bs


export default upload;