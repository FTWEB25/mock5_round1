const express=require("express")
const EmployeeModel = require("../model/employee.model")

const employeeRouter=express.Router()


employeeRouter.get("/",async(req,res)=>{
    try {
        const employees=await EmployeeModel.find()
        res.status(200).json({employees:employees})
    } catch (error) {
        res.status(400).json({msg:error.message})
    }
})


employeeRouter.post("/add",async(req,res)=>{
    const payload=req.body
    try {
        const employee= new EmployeeModel(payload)
        await employee.save()
        res.status(200).json({msg:"Employee has been added",employee:payload})
    } catch (error) {
        res.status(400).json({msg:error.message})
    }
})

employeeRouter.patch("/:id",async(req,res)=>{
    const ID= req.params.id
    const payload=req.body
    try {
        await EmployeeModel.findByIdAndUpdate({_id:ID},payload)
        res.status(200).json({msg:"Employee has been updated"})
    } catch (error) {
        res.status(400).json({msg:error.message})
    }
})

employeeRouter.delete("/:id",async(req,res)=>{
    const ID= req.params.id
    try {
        await EmployeeModel.findByIdAndDelete({_id:ID})
        res.status(200).json({msg:"Employee has been Deleted"})
    } catch (error) {
        res.status(400).json({msg:error.message})
    }
})

//filtering
employeeRouter.get("/filter",async(req,res)=>{
    const department=req.query.department
    try {
        const employees=await EmployeeModel.find({department:department})
        res.status(200).json({employees:employees})
    } catch (error) {
        res.status(400).json({msg:error.message})
    }
})

//sorting
employeeRouter.get("/sort",async(req,res)=>{
    const sort=req.query.sort
    try {
        if(sort=="desc"){
            const employees=await EmployeeModel.find().sort({salary:-1})
            res.status(200).json({employees:employees})
        }else if(sort=="asc"){
            const employees=await EmployeeModel.find().sort({salary:1})
            res.status(200).json({employees:employees})
        }else{
            const employees=await EmployeeModel.find()
            res.status(200).json({employees:employees})
        }
    } catch (error) {
        res.status(400).json({msg:error.message})
    }
})

//searching

employeeRouter.get("/search",async(req,res)=>{
    const firstName=req.query.firstName
    try {
        const employees=await EmployeeModel.find({firstName:firstName})
        res.status(200).json({employees:employees})
    } catch (error) {
        res.status(400).json({msg:error.message})
    }
})

module.exports=employeeRouter


