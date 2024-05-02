const express = require("express");
const {userAuth} = require("../middleware/authMiddleware.js");
const {
    createEvent,
    getEvents,
    getEvent,
    updateEvent,
    deleteEvent,
    getEventsBySearch,
    getEventsByTag,
    getRelatedEvents,
    likeEvent,
    getEventsWithUserId,
    getEventsByGuests
} = require("../Controllers/eventController");

const router = express.Router();

router.post("/createevent", userAuth, createEvent);
router.get("/getevents", getEvents);
router.get("/geteventsbyuser/:userId", getEventsWithUserId);

router.get("/getevent/:id", getEvent);
router.put("/updateevent/:id", userAuth, updateEvent);
router.delete("/deleteevent/:id", userAuth, deleteEvent);
router.get("/searchevents", getEventsBySearch);
router.get("/tagevents/:tag", getEventsByTag);
router.get("/guestevents/:guest", getEventsByGuests);

router.post("/relatedevents", getRelatedEvents);
router.post("/likeevent/:id", userAuth, likeEvent);
//router.get("/userevents/:userId", getEventsWithUserId);

module.exports = router;