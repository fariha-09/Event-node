import express from "express";
import Event from "../model/eventModel.js";

export const getEvents = async (req, res) => {
  try {
    const getAllEvents = await Event.find();
    res.send(getAllEvents);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching events...",
      error,
    });
  }
};

export const getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const event =await Event.findById(id);
    console.log("Requested ID:", id);
    if (!event) {
      return res.status(400).json({
        message: "Event not found with this id.kindly enter correct id.",
      });
    }
    console.log("event", event);

    res.status(200).send(event);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching required event.",
      error,
    });
  }
};

export const addEvent = async (req, res) => {
  try {
    const { title, description, location, date, image } = req.body;
     if (!title || !description || !date || !location || !image) {
      return res.status(400).json({ message: "All fields are required." });
    }
    const newEvent = new Event({
      title,
      description,
      location,
      date,
      image,
      organizer: req.user._id
    });
    await newEvent.save();
    res.status(201).json({
      message: "Event added successfully.",
      data: newEvent,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error adding new event.",
      error,
    });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEvent = await Event.findByIdAndDelete(id);
    res.status(200).json({
      message: "Event deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting event.",
      error,
    });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, location, date, image } = req.body;
    const isEvent = await Event.findById(id);
    if (!isEvent)
    return  res.status(400).json({
        message: "Event not found with this id.Kindly enter correct id..",
      });

    isEvent.title = title;
    isEvent.description = description;
    isEvent.location = location;
    isEvent.date = date;
    isEvent.image = image;

    const updatedEvent = await isEvent.save();

    res.status(200).json({
      message: "Event updated successfully.",
      data: updatedEvent,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating event.",
      error,
    });
  }
};
export const getMyEvents = async (req, res) => {
  try {
    const myEvents = await Event.find({ organizer: req.user._id });
    res.status(200).json(myEvents);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching organizer's events.",
      error,
    });
  }
};
