import mongoose from "mongoose";import dotenv from "dotenv";import {Course,Assignment} from "./models.js";
dotenv.config();
async function run(){
 try{
  await mongoose.connect(process.env.MONGO_URI);
  await Course.deleteMany({});await Assignment.deleteMany({});
  const data=await Course.insertMany([
   {title:"Web Development Fundamentals",category:"Development",instructor:"Sarah Johnson",description:"Learn HTML, CSS and JavaScript and build your first responsive website.",level:"Beginner",duration:"6 weeks",image:"https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900",lessons:[{title:"Introduction to Web Development",duration:"12 min",content:"Understand how websites work."},{title:"HTML Page Structure",duration:"18 min",content:"Learn headings, links, images and semantic HTML."},{title:"CSS Styling and Layout",duration:"22 min",content:"Explore colors, spacing and Flexbox."},{title:"JavaScript Basics",duration:"25 min",content:"Learn variables, functions and DOM interactions."}]},
   {title:"Python Programming for Beginners",category:"Programming",instructor:"David Miller",description:"Start coding with Python through simple examples and exercises.",level:"Beginner",duration:"4 weeks",image:"https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=900",lessons:[{title:"Getting Started with Python",duration:"15 min",content:"Run your first Python program."},{title:"Variables and Data Types",duration:"20 min",content:"Work with strings, numbers and lists."},{title:"Conditions and Loops",duration:"24 min",content:"Control program flow."}]},
   {title:"UI/UX Design Essentials",category:"Design",instructor:"Olivia Brown",description:"Discover user-centered design, wireframes, color systems and prototypes.",level:"Intermediate",duration:"5 weeks",image:"https://images.unsplash.com/photo-1559028012-481c04fa702d?w=900",lessons:[{title:"Introduction to UI and UX",duration:"10 min",content:"Understand interface and user experience."},{title:"Wireframing",duration:"17 min",content:"Plan page structure."},{title:"Visual Design Basics",duration:"21 min",content:"Use typography, color and spacing."}]}
  ]);
  await Assignment.insertMany([{title:"Build a Personal Web Page",course:data[0]._id,description:"Create a simple page using HTML and CSS.",dueDate:new Date(Date.now()+7*86400000)},{title:"Python Practice Exercises",course:data[1]._id,description:"Write programs using variables, conditions and loops.",dueDate:new Date(Date.now()+12*86400000)},{title:"Create a Mobile App Wireframe",course:data[2]._id,description:"Prepare a wireframe for a learning app home screen.",dueDate:new Date(Date.now()+15*86400000)}]);
  console.log("Sample data inserted.");
 }catch(e){console.error(e.message);}finally{await mongoose.disconnect();}
}
run();
