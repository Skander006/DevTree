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
    const {username, bio} = req.body;
    const user = await User.findByIdAndUpdate(
        req.user.id,
        {
            username,
            bio
        },
        {
            new : true
        }
    );
    if(!user){
        return res.status(404).json({error : "User not found :"});
    }
    res.status(200).json({
        message : "Profile updated successfully !" ,
        user
    });
});

router.post('/avatar', protect, storage.single("avatar"), async (req,res)=>{
    try{
        const user = await User.findByIdAndUpdate(
            req.user.id,
            {
                avatar : req.file.filename
            },
            {
                new : true
            }
        );
        if (!user){
            return res.status(404).json({error : "User not found !"});
        }
        res.json({
            message : "Avatar updated successfully !",
            user
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