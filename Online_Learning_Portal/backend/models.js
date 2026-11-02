import mongoose from "mongoose";
export const User = mongoose.model("User", new mongoose.Schema({
  name:{type:String,required:true}, email:{type:String,required:true,unique:true}, password:{type:String,required:true}
},{timestamps:true}));
const lessonSchema = new mongoose.Schema({title:String,duration:String,content:String});
export const Course = mongoose.model("Course", new mongoose.Schema({
  title:String,category:String,instructor:String,description:String,level:String,duration:String,image:String,lessons:[lessonSchema]
},{timestamps:true}));
export const Enrollment = mongoose.model("Enrollment", new mongoose.Schema({
  user:{type:mongoose.Schema.Types.ObjectId,ref:"User"},course:{type:mongoose.Schema.Types.ObjectId,ref:"Course"},progress:{type:Number,default:0}
},{timestamps:true}));
export const Assignment = mongoose.model("Assignment", new mongoose.Schema({
  title:String,course:{type:mongoose.Schema.Types.ObjectId,ref:"Course"},description:String,dueDate:Date,status:{type:String,default:"Pending"}
},{timestamps:true}));
