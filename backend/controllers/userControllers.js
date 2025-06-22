
import usermodel from "../models/userModel.js";
import validator from "validator";
import bcrypt  from "bcrypt";
import jwt from "jsonwebtoken";
import err from "multer/lib/multer-error.js";

const createToken = (id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "2d"});
}

//Route for user Login
const loginUser =async (req, res)=>{

    try{
        const { email, password } = req.body;
        const user = await usermodel.findOne({email});
        if(!user){
            return res.json({success:false,message:"User doesn't exists"});
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if (isMatch){
            const token = createToken(user._id)
            return res.json({success:true,token});
        }else{
            return res.json({success:false,message:"Invalid Credentials"});
        }



    }catch (e) {

    }
}


//Route for user register
const registerUser= async (req,res)=>{
    try{

        const {name, email, password} = req.body;

        //checking user already exists or not
        const exists =await usermodel.findOne({email});
        if(exists){
            return res.json({success:false,message:"User already exists"});
        }

        //validating email format & strong password
        if (!validator.isEmail(email)){
            return res.json({success:false,message:"Please enter a valid email"});
        }

        if (password.length < 8){
            return res.json({success:false,message:"Please enter a Strong password"});
        }

        //hashing user password
        const salt =await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = new usermodel({name,
            email,
            password: hashPassword});
        const user = await newUser.save();

        const token = createToken(user._id);


        res.json({success:true,token});






    }catch(err){
        console.log(err);
        res.json({success:false,message:err.message});

    }
}

//Route for admin login
const adminLogin = async (req,res)=>{
    try{

        const {email, password} = req.body;

        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){

            const token = jwt.sign(email+password,process.env.JWT_SECRET);
            res.json({success:true,token});
        }else{
            res.json({success:false,message:"Invalid Credentials"});
        }

    }catch (e) {
        console.log(e);
        res.json({success:false,message:e.message});

    }

}

export {loginUser,registerUser,adminLogin}