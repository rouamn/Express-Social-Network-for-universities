const express = require("express");
const addStory = require("../Controllers/storyController");
const router = express.Router();

// Route pour l'ajout d'une nouvelle histoire
router.post("/add", addStory);


module.exports = router;