const express=require("express")
const UserModel = require("../model/user.model")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

const userRouter=express.Router()

userRouter.post("/signup",async(req,res)=>{
    const {email,password}=req.body
    try {
        const user=await UserModel.findOne({email:email})
        if(user){  
            res.status(200).json({msg:"User already exist"})
        }else{
            bcrypt.hash(password, 2, async(err, hash) =>{
                // Store hash in your password DB.
                if(err){
                    res.status(400).json({msg:err.message})
                }else{
                    const newUser= new UserModel({email:email,password:hash})
                    newUser.save()
                    res.status(200).json({msg:"new User Has been added"})
                }
            }); 
        }
    } catch (error) {
        res.status(400).json({msg:error.message})
    }
})


userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try {
        const user=await UserModel.findOne({email:email})
        if(user){
            bcrypt.compare(password, user.password, async(err, result)=> {
                
                if(result){
                    var token = jwt.sign({ foo: 'bar' }, 'shhhhh');
                    res.status(200).json({msg:"Login Successfull",token:token})
                }else{
                    res.status(200).json({msg:"Please check your Password"})  
                }
            });
        }else{
            res.status(200).json({msg:"User Does not Exist"})
        }
    } catch (error) {
        res.status(400).json({msg:error.message}) 
    }
})

module.exports=userRouter