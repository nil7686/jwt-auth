import bcrypt from "bcrypt"
import _ from 'lodash'
import axios from "axios"
import otpGenerator from "otp-generator"
import UserModel from "../Model/userModel.js"
import OtpModel from "../Model/otpModel.js"

class verify{

 static signUp = async(req,res) => {

    const user = await UserModel.findOne({
        number: req.body.number
    });
    if (user) return res.status(400).send("user alredy exist");
    const OTP = otpGenerator.generate(6,{
        digits: true, alphabets: false, upperCase :false, specialChars: false
    });
    const number = req.body.number;
    console.log(OTP);
const otp = new OtpModel({number:number,otp: OTP});
const salt = await bcrypt.genSalt(10)
otp.otp = await bcrypt.hash(otp.otp,salt);
const result = await otp.save();
return res.status(200).send("otp send sucessfully!")



}
 static verifyOtp = async(req,res) => {
    const otpHolder = await OtpModel.find({
        number: req.body.number
    });
    if(otpHolder.length === 0) return res.status(400).send("you use an expired OTP");
    const rightOtpFind = otpHolder[otpHolder.length -1];
    const validUser = await bcrypt.compare(req.body.otp,rightOtpFind.otp);

    if(rightOtpFind.number === req.body.number && validUser){
        const user = new UserModel(_.pick(req.body,["number"]));
        const token = user.generateJWT();
        const result = await user.save();
        const OTPDeleted = await OtpModel.deleteMany({
            number: rightOtpFind.number
        });
        return res.status(200).send({
            message: "user registration sucessfull",
            token: token,
            date: result
        });
    }else{
        return res.status(400).send("your otp was wrong")
    }
}
}

export default verify;
