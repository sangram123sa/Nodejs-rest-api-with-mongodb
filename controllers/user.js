const User = require('../models/user');


async function handleFindAllUser(req, res) {
    const result = await User.find({})
    return res.send(result)
}

async function handleFindUserByID(req, res) {
    const user = await User.findById(req.params.id);
    if (!user) {
        return res.status(404).json({ status: "panding" })
    }
    return res.send(user)
}

async function handleAddUser(req, res){
    const body = req.body
    if(!body||!body.first_name||!body.last_name||!body.email||!body.gender||!body.job_title){
        return res.status(400).json({msg:"All fields are req ..."})
    }
    await User.create({
        firstName:body.first_name,
        lastName: body.last_name,
        email:body.email,
        jobTitle:body.job_title,
        gender:body.gender   
    });
    return res.status(201).json({msg:"success"})
}

async function handleUpdateUserByID(req, res){
    const body = req.body
    if(!body){
        return res.status(404).json({status:"pending"})
    }
    await User.findByIdAndUpdate(req.params.id, body)
    return res.json({status:"Success"})
}

async function handleDeleteUserByID(req, res){
    await User.findByIdAndDelete(req.params.id)
    return res.json({status:"Success"})
}

module.exports = {
    handleFindAllUser,
    handleFindUserByID,
    handleAddUser,
    handleUpdateUserByID,
    handleDeleteUserByID
}