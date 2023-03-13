//import mongoose from "mongoose";
const mongoose = require('mongoose');

const Schema = mongoose.Schema ;
const Userschema = new Schema({
    fname:{
        type:String,
       required:true
    },
    lname:{
        type:String,
       required:true
    },
    email:{
        type:String,
        required:true,
        unique:true 
    },
    password:{
        type:String,
        required:true
    },
    image:{
        type:String 
    },
    isAdmin:{
       type:String
    },
    address1:{
        type:String
    },
    address2:{
        type:String
    }

});

module.exports = mongoose.model('User', Userschema);