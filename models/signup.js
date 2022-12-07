import express from 'express'
import mongoose from 'mongoose';
//const { Schema } = mongoose;


const SignupSchema = new mongoose.Schema({
  email: {type: String, required : true},
  password: {type: String, required : true,min:5,max:20},  
  mobile_number: { type: String}, 
  name: {type: String},

});

const StudentModel =  mongoose.model('SingUp', SignupSchema);

//module.exports = StudentModel
export default StudentModel;


  
  
  
