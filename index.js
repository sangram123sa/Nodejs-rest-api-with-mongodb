const express = require('express');
const mongoose = require('mongoose');

const app = express()
const port = 8000
mongoose.connect("mongodb://127.0.0.1:27017/my-app")
.then(()=>console.log("MongoDB connected"))
.catch((err)=>console.log("some error come", err))
const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        require:true
    },
    lastName:{
        type:String,
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    jobTitle:{
        type:String,
        require:true
    },
    gender:{
        type:String,
        require:true
    }
})

const User = mongoose.model("user", userSchema)
app.use(express.urlencoded({extended:false}))


// insert
app.post("/api/users/", async(req, res)=>{
    const body = req.body
    // await console.log('hell')
    if(!body||!body.first_name||!body.last_name||!body.email||!body.gender||!body.job_title){
        return res.status(400).json({msg:"All fields are req ..."})
    }
    await User.create({
        firstName:body.first_name,
        lastName: body.last_name,
        email:body.email,
        gender:body.gender     
    });
    return res.status(201).json({msg:"success"})
})
// Get all data
app.get("/api/users/", async(req, res)=>{
    const result = await User.find({})
    return res.send(result)
})
// Get, update and delete data basis on it's id
app.route("/api/users/:id")
.get(async(req, res)=>{
    const user = await User.findById(req.params.id);
    if (!user) {
        return res.status(404).json({status:"panding"})
    }
    return res.send(user)
})
.patch(async(req, res)=>{
    const body = req.body
    if(!body){
        return res.status(404).json({status:"pending"})
    }
    await User.findByIdAndUpdate(req.params.id, body)
    return res.json({status:"Success"})
})
.delete(async(req, res)=>{
    await User.findByIdAndDelete(req.params.id)
    return res.json({status:"Success"})
})

app.listen(port, ()=> console.log(`http://localhost:${port}`))