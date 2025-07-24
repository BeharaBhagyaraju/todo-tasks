import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req , res) => {
    try{
        const {name , email , password} = req.body;

        if(!name || !email || !password){
            return res.status(400).json({
                message:"Something is missing",
                success:false,
            });
        }

        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(400).json({
                message:"email already exists",
                success:false,
            });
        }

        const hashedPassword = await bcrypt.hash(password,10);
        const newUser = new User({
            name,
            email,
            password:hashedPassword,
        });
        await newUser.save();

        res.status(201).json({
            message:"User registered successfully",
            success:true,
        });
    }catch(error){ 
        console.log(error);

    }

}

export const loginUser = async (req , res) => {
    try{
        const {email,password} = req.body;
        if(!email || ! password){
            return res.status(400).json({
                message:"Please fill all the fields",
                success: false,
            });
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({
                message:"User not found",
                success:false,

            });
        }
        const isValidPassword = await bcrypt.compare(password,user.password);
        if(!isValidPassword){
            return res.status(401).json({
                message:"Invalid password",
                success:false,
            });
        }

        const token = jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:"1d"});

        const userData = {
            _id:user._id,
            name:user.name,
            email:user.email,
        };

        res.status(201).cookie("token",token,{
            maxAge:1*24*60*60*1000,
            httpOnly: true,
            sameSite:"strict",
        }).json({
            message:`Welcome back ${user.name}`,
            user:userData,
            token,
            success:true,
        });
    }catch(error){
        console.log(error);
    }
}

export const logoutUser = async (req , res) => {
    try{
        return res.status(200).cookie("token","",{
            maxAge:0,
        }).json({
            message:"Logged out successfully",
            success:true,
        });
    }catch(error){
        console.log(error);
    }
}

export const updateUser = async (req , res) => {
    try{
        const {name , email } = req.body;
        const userId = req.user._id;
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({
                message:"User not found",
                success:false,
            });
        }

        if(name){
            user.name = name; 
        }
        if(email){
            user.email = email;
        }
        await user.save();

        const userData = {
            _id:user._id,
            name:user.name,
            email:user.email,
        }

        return res.status(200).json({
            message:"User updated successfully",
            user:userData,
            success:true,
        });
        
    }catch(error){
        console.log(error);
    } 
}