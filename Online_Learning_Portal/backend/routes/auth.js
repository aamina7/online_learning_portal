import {Router} from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {User} from "../models.js";
import auth from "../middleware.js";
const r=Router();
const makeToken=id=>jwt.sign({id},process.env.JWT_SECRET,{expiresIn:"1d"});
r.post("/register",async(req,res)=>{
 try{
  const {name,email,password}=req.body;
  if(!name||!email||!password)return res.status(400).json({message:"All fields are required."});
  if(password.length<6)return res.status(400).json({message:"Password must be at least 6 characters."});
  if(await User.findOne({email}))return res.status(409).json({message:"Email already registered."});
  const u=await User.create({name,email,password:await bcrypt.hash(password,10)});
  res.status(201).json({token:makeToken(u._id),user:{id:u._id,name:u.name,email:u.email}});
 }catch(e){res.status(500).json({message:e.message});}
});
r.post("/login",async(req,res)=>{
 try{
  const u=await User.findOne({email:req.body.email});
  if(!u||!await bcrypt.compare(req.body.password,u.password))return res.status(400).json({message:"Invalid email or password."});
  res.json({token:makeToken(u._id),user:{id:u._id,name:u.name,email:u.email}});
 }catch(e){res.status(500).json({message:e.message});}
});
r.get("/me",auth,async(req,res)=>{const u=await User.findById(req.userId).select("-password");res.json({user:u});});
export default r;
