// routers/eventRouter.js

import express from "express";
import {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} from "../Controllers/eventController";

const router = express.Router();

router.post("/", createEvent);
router.get("/", getEvents);
router.get("/:id", getEventById);
router.patch("/:id", updateEvent);
router.delete("/:id", deleteEvent);

export default router;
