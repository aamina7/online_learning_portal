import {Router} from "express";
import {Course,Enrollment} from "../models.js";
import auth from "../middleware.js";
const r=Router();
r.get("/",async(req,res)=>res.json(await Course.find().sort({createdAt:-1})));
r.get("/my/enrolled",auth,async(req,res)=>res.json(await Enrollment.find({user:req.userId}).populate("course")));
r.get("/:id",async(req,res)=>{try{const c=await Course.findById(req.params.id);if(!c)return res.status(404).json({message:"Course not found"});res.json(c);}catch{return res.status(400).json({message:"Invalid course ID"});}});
r.post("/:id/enroll",auth,async(req,res)=>{
 try{
  const c=await Course.findById(req.params.id);if(!c)return res.status(404).json({message:"Course not found"});
  let e=await Enrollment.findOne({user:req.userId,course:c._id});
  if(!e)e=await Enrollment.create({user:req.userId,course:c._id});
  res.json({message:"Successfully enrolled!",enrollment:e});
 }catch(err){res.status(500).json({message:err.message});}
});
export default r;
