import {Router} from "express";
import {Assignment} from "../models.js";
import auth from "../middleware.js";
const r=Router();
r.get("/",auth,async(req,res)=>res.json(await Assignment.find().populate("course","title").sort({dueDate:1})));
r.patch("/:id/submit",auth,async(req,res)=>{
 try{const a=await Assignment.findByIdAndUpdate(req.params.id,{status:"Submitted"},{new:true}).populate("course","title");if(!a)return res.status(404).json({message:"Assignment not found"});res.json(a);}
 catch{return res.status(400).json({message:"Invalid assignment ID"});}
});
export default r;
