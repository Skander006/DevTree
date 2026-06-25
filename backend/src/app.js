import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/profil.js";
import {ConnectDB} from "./config/db.js";

dotenv.config();
const app = express();
ConnectDB();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.get("/health", (req, res)=>{
    res.status(200).json({message : "Health check passed"});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`Server running on  ${PORT}...`);
});