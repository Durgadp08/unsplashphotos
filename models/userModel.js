import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email:{type:String, required:true},
    username:{type:String,required:true},
    password:{type: String , required:true},
    favourite:[{type:String}]
})
export const userModel = mongoose.model('users',userSchema)