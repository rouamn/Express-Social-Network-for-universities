const mongoose = require("mongoose");
const { Schema } = mongoose;

// Définition du schéma pour le modèle Story
const storySchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User", // Référence au modèle User, assurez-vous que ce modèle existe dans votre application
  },
  firstName: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
  },
  story_photo: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Story = mongoose.model("Story", storySchema);
module.exports = Story
