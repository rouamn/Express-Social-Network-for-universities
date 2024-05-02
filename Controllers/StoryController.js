const User = require("../models/user.js")
const Story = require("../Models/story.js")

const addStory = async (req, res) => {
  try {
    const { userId, storyData } = req.body;


    const newStory = await Story.create({
      userId,
      firstName: storyData.firstName,
      photo: storyData.photo,
      story_photo: storyData.story_photo,
    });


    res.status(200).json({
      success: true,
      message: "Story added successfully",
      data: newStory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error adding story",
      success: false,
      error: error.message,
    });
  }
};


module.exports = addStory;
