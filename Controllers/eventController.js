const Event = require("../Models/Event");

// Créer un événement
exports.createEvent = async (req, res) => {
  try {
    const { userId } = req.body.user;
    const { title, description, image, date, location, tags } = req.body;

    if (!title || !description || !date || !location) {
      return res.status(400).json({ message: "Title, description, date, and location are required" });
    }

    const newEvent = await Event.create({
      createdBy: userId,
      title,
      description,
      image,
      date,
      location,
      tags,
    });

    res.status(201).json({
      success: true,
      message: "Event created successfully",
      data: newEvent,
    });
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ message: "Failed to create event" });
  }
};

// Obtenir tous les événements paginés
exports.getEvents = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 9;
  const startIndex = (page - 1) * limit;
  try {
    const totalEvents = await Event.countDocuments({});
    const totalPages = Math.ceil(totalEvents / limit);
    const events = await Event.find().limit(limit).skip(startIndex);
    res.json({
      data: events,
      currentPage: page,
      totalEvents,
      totalPages,
    });
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ message: "Failed to fetch events" });
  }
};

// Obtenir un événement par son ID
exports.getEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json(event);
  } catch (error) {
    console.error("Error fetching event:", error);
    res.status(500).json({ message: "Failed to fetch event" });
  }
};

// Supprimer un événement
exports.deleteEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedEvent = await Event.findByIdAndDelete(id);
    if (!deletedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ message: "Failed to delete event" });
  }
};

// Mettre à jour un événement
exports.updateEvent = async (req, res) => {
  const { id } = req.params;
  const { title, description, image, date, location, tags } = req.body;
  try {
    const updatedEvent = await Event.findByIdAndUpdate(id, {
      title,
      description,
      image,
      date,
      location,
      tags,
    }, { new: true });
    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json(updatedEvent);
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({ message: "Failed to update event" });
  }
};

// Obtenir les événements par recherche
exports.getEventsBySearch = async (req, res) => {
  const { searchQuery } = req.query;
  try {
    const events = await Event.find({ title: { $regex: searchQuery, $options: 'i' } });
    res.json(events);
  } catch (error) {
    console.error("Error searching events:", error);
    res.status(500).json({ message: "Failed to search events" });
  }
};

// Obtenir les événements par tag
exports.getEventsByTag = async (req, res) => {
  const { tag } = req.params;
  try {
    const events = await Event.find({ tags: tag });
    res.json(events);
  } catch (error) {
    console.error("Error fetching events by tag:", error);
    res.status(500).json({ message: "Failed to fetch events by tag" });
  }
};

// Obtenir les événements liés
exports.getRelatedEvents = async (req, res) => {
  const { tags } = req.body;
  try {
    const events = await Event.find({ tags: { $in: tags } });
    res.json(events);
  } catch (error) {
    console.error("Error fetching related events:", error);
    res.status(500).json({ message: "Failed to fetch related events" });
  }
};

// Aimer ou désaimer un événement
exports.likeEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    const userId = req.userId;
    const index = event.likes.indexOf(userId);
    if (index === -1) {
      // User has not liked the event, so like it
      event.likes.push(userId);
    } else {
      // User has already liked the event, so unlike it
      event.likes.splice(index, 1);
    }
    await event.save();
    res.status(200).json(event);
  } catch (error) {
    console.error("Error liking event:", error);
    res.status(500).json({ message: "Failed to like event" });
  }
};


exports.getEventsWithUserId = async (req, res) => {
  const { userId } = req.params; // Assuming userId is passed as a parameter
  try {
    const events = await Event.find({ createdBy: userId });
    res.json(events);
  } catch (error) {
    console.error("Error fetching user events:", error);
    res.status(500).json({ message: "Failed to fetch user events" });
  }
};

