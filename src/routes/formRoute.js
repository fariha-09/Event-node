import express from "express";
import { addBooking,getAllBookings,getBookingsByEvent } from "../controller/form.js";

const formRouter=express.Router();

formRouter.get("/",getAllBookings);
formRouter.post("/",addBooking);
formRouter.get("/by-event/:eventId", getBookingsByEvent); 

export default formRouter;
