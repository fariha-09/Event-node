import mongoose, { Schema } from "mongoose";

const usersSchema=new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
    },
     email:{
        type:String,
        required:true,
        unique:true,
    },
     password:{
        type:String,
        required:true,
    },
    phoneNumber: {
      type: String,
    },
      location:{
      type: String,
      required: true,
    },
     role:{
      type: String,
      required: true,
    },
},
 { timestamps: true }
) 

const Users=mongoose.model("User",usersSchema);
export default Users;