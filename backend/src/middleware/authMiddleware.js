import jwt from "jsonwebtoken";

export const protect = (req, res, next)=>{
    const header = req.headers.authorization;
    if(!header || !header.startsWith("Bearer")){
        return res.status(404).json({error : "No token found"});
    }
    const token = header.split(" ")[1];
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch(error){
        return res.status(401).json({error : "Invalid token"})
    }
}
