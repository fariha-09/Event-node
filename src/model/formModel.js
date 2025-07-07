import mongoose from "mongoose";

const bookingSchema=new mongoose.Schema({
name:{
    type:String,
    required:true
},
email:{
    type:String,
    required:true
},
tickets:{
    type:Number,
     min: 1,
    required:true,
},
eventId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Event",
    required:true
  
},

},{
    timestamps:true
})

const Booking=mongoose.model("Booking",bookingSchema);
export default Booking;