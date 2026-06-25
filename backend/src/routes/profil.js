import express from "express";
import {protect} from "../middleware/authMiddleware.js";
const router = express.Router();
import storage from "../middleware/avatarMiddleware.js";
import User from "../models/user.js";


//private profile route
router.get('/me', protect, async (req,res)=>{
    const user = await User.findById(req.user.id);
    if(!user){
        return res.status(404).json({error : "User not found  !"});
    }
    res.status(200).json(user);
});

router.put('/me', protect, async (req,res)=>{
    const user = User.findById(req.user.id);
    if(!user){
        return res.status(404).json({error : "User not found !"});
    }
    if (req.body.username){
        user.username = req.body.username;
    }
    if(req.body.bio){
        user.bio = req.body.bio;
    }
    await user.save();
    res.status(200).json(user);
});

router.post('/avatar', protect, storage.single("avatar"), async (req,res)=>{
    try{
        const user = await User.findById(req.user.id);
        if(!user){
            return res.status(404).json({error : "User not found !"});
        }
        user.avatar = req.file.filename;

        return res.status(200).json({
            message : "Avatar uploaded successfully !",
            avatar : user.avatar
        });
    } catch(err){
        return res.status(500).json({error : err.message});
    }
});

//public profile route
router.get('/:username', protect, async (req,res)=>{
    const username = req.params.username;
    const user = await User.findOne({username});
    if(!user){
        return res.status(404).json({error : "User with this username not found !"});
    }
    res.status(200).json({avatar : user.avatar, bio : user.bio, firstname : user.firstname, lastname : user.lastname, username : user.username});
});



export default router;