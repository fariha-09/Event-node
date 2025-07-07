import express from "express";
import {
  addEvent,
  getEvents,
  getEventById,
  deleteEvent,
  updateEvent,
  getMyEvents,
} from "../controller/events.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getEvents);
router.get("/my-events", protect, getMyEvents);  
router.get("/:id", getEventById);
router.post("/", protect, addEvent);
router.put("/:id", protect, updateEvent);
router.delete("/:id", protect, deleteEvent);

export default router;
