const mongoose = require('mongoose');

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

module.exports = User