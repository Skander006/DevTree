import mongoose from "mongoose";

export const ConnectDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI);
    } catch(err){
        console.error('MongoDB connection error:', err);
        process.exit(1);
    }
}
