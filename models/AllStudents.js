import express from 'express'
import mongoose from 'mongoose';
//const { Schema } = mongoose;


const StudentSchema = new mongoose.Schema({
  name: {type: String, required : true},
  age: {type: String, required : true,min:5,max:20},  
  father_name: { type: String, required : true}, 
  roll_no: {type: Number, required : true}
});

const StudentModel =  mongoose.model('Student', StudentSchema);

//module.exports = StudentModel
export default StudentModel;


  
  
  
