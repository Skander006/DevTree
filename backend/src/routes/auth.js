import express from "express";
import User from "../models/user.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post('/register',async(req,res)=>{
    const {firstname, lastname, email, password, username} = req.body;
    if(!firstname || !lastname || !email || !password || !username){
        return res.status(400).json({error : "Please fill all the fields !"});
    }
    try{
        const user = await User.create({firstname, lastname, email, password, username});
        const token = jwt.sign(
            {id : user._id, email : user.email, username : user.username},
            process.env.JWT_SECRET,
            {expiresIn : "30d"}
        );
        return res.status(201).json({token, user : {id : user._id, firstname : user.firstname, lastname : user.lastname, email : user.email, username : user.username, bio : user.bio, avatar : user.avatar}});
    }catch(error){
        if(error.code === 11000){
            return res.status(401).json({error : "User already exists !"});
        }
        return res.status(500).json({error : error.message});
    }
});

router.post('/login', async(req,res)=>{
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(400).json({error : "Please fill all the fields !"});
    }
    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({error : "User not found !"});
        }
        const valid = await user.comparePassword(password);
        if(!valid){
            return res.status(401).json({error : "Incorrect Password !"});
        }
        const token = jwt.sign(
            {id : user._id, email : user.email, username : user.username},
            process.env.JWT_SECRET,
            {expiresIn : "30d"}
        );
        return res.status(200).json({token, user : {firstname : user.firstname, lastname : user.lastname, email : user.email, username : user.username, bio : user.bio, avatar : user.avatar}});
    }
    catch(err){
        return res.status(500).json({error : err.message});
    }
});

export default router;