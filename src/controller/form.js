import Booking from "../model/formModel.js";

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("eventId");
    res.status(200).json({
      message: "Bookings received successfully.",
      data: bookings,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching bookings.",
      error,
    });
  }
};

export const addBooking = async (req, res) => {
  try {
    const { name, email, tickets, eventId } = req.body;

    if (!name || !email || !tickets || !eventId) {
      return res.status(400).json({
        message: "All fields are required.",
      });
    }

    
    console.log("Incoming booking request:", req.body);

    const existingBooking = await Booking.findOne({ email, eventId });

    if (existingBooking) {
      return res.status(400).json({
        message: "You have already booked this event with this email.",
      });
    }

    const newBooking = new Booking({ name, email, tickets, eventId });
    await newBooking.save();

    res.status(201).json({
      message: "Form submitted successfully.",
      data: newBooking,
    });
  } catch (error) {
    console.error("Error saving booking:", error);
    res.status(500).json({
      message: "Error saving booking to DB.",
      error: error.message || error,
    });
  }
};


export const getBookingsByEvent = async (req, res) => {
  try {
    const { eventId } = req.params;

    const bookings = await Booking.find({ eventId });

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching bookings for this event.",
      error,
    });
  }
};
