import users from "../models/user.js"
import bcrypt from "bcrypt";
import  jwt  from "jsonwebtoken";

// sign up account
export const sign_up=async(req,res)=>{
  try{
    //payload take from input field
  const{username,email,password,role,cata}=req.body;
   //payload validation
   if(!username || !email || !password,!role||!cata){
           return res.status(400).json({msg: "Please fill in all fields."})
   }
  const user = await users.findOne({email:email});
  if(user) return res.status(400).json({msg: "This email already exists."});

 if(password.length<6){
  return res.status(400).json({msg:"password must be atleast 6  or and above characters"});
 }
  const password_hash=await bcrypt.hash(password,12);
 const payload = { "username":username,"email":email,"password":password_hash,"role":role,"cat":cata};
 const newUser=await new users(payload)
 await newUser.save();
  return res.status(500).json({ msg:"Register Success! Account has been created successfuly!!👍👍👍"});
}catch(err){
  return res.status(400).json({msg:err.message})
}
}
//Account login 
export const login=async(req,res)=>{
  try{
const {email,password}=req.body;
const user=await users.findOne({email:email})
if(!user){
  return res.status(400).json({msg:"this email is not available"})
}
const ismatch=await bcrypt.compare(password,user.password)
if(!ismatch){
  return res.status(400).json({msg:"password is not correct"})
}
const payload = {id: user._id, name: user.username}
const token = jwt.sign(payload, process.env.usertoken_secret, {expiresIn: "1d"})
return res.json({username:user.username,email:user.email,token:token})
}catch(err){
  return res.status(500).json({msg:err.message})
}
}


