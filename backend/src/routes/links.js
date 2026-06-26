import express from "express";
import {protect} from "../middleware/authMiddleware.js";
import Link from "../models/link.js";


const router = express.Router();

router.get('/', protect, async (req,res)=>{
    try{
        const links = await Link.find({userId : req.user.id});
        if(!links){
            return res.status(404).json({error : "Links not found !"});
        }
        res.status(200).json(links);
    } catch(err){
        return res.status(500).json({error : err.message});
    }
});

router.post('/', protect, async(req,res)=>{
    const {title, url} = req.body;
    if(!title || !url){
        return res.status(400).json({error : "Please fill all the fields !"});
    }
    try{
        const link = await Link.create({
            title,
            url,
            userId : req.user.id
        });
        res.status(201).json(link);
    } catch(err){
        return res.status(500).json({error : err.message});
    }
});

router.put('/:id', protect, async(req,res)=>{
    const {title, url} = req.body;
    try{
        const link = await Link.findByIdAndUpdate(req.params.id, {
            title : title,
            url : url
        },{
            new : true
        });
        if(!link){
            return res.status(404).json({error : "Link not found !"});
        }
        res.status(200).json({message : "Link updated successfully !"}, link);
    } catch(err){
        return res.status(500).json({error : err.message});
    }
});

router.delete('/:id', protect, async(req,res)=>{
    try{
        const link = await Link.findByIdAndDelete(req.params.id);
        if(!link){
            return res.status(404).json({error : "Link not found !"});
        }
        res.status(200).json({message : "Link deleted successfully !"});
    }
    catch(error){
        return res.status(500).json({error : error.message});
    }
});


export default router;