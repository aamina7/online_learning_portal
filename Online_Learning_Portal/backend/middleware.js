import jwt from "jsonwebtoken";
export default function auth(req,res,next){
  const token=req.headers.authorization?.split(" ")[1];
  if(!token) return res.status(401).json({message:"Please log in first."});
  try{req.userId=jwt.verify(token,process.env.JWT_SECRET).id;next();}
  catch{return res.status(401).json({message:"Invalid or expired login. Please log in again."});}
}
