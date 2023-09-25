const mongoose=require("mongoose")
const bcypt=require("bcrypt")


const userSchema=mongoose.Schema({
    email:String,
    password:String
})


const UserModel=mongoose.model("user",userSchema)


module.exports=UserModel