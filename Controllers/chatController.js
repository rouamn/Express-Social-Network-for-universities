const  ChatModel  = require ("../Models/chatModel.js");


//create chat
exports.createChat = async (req, res) => {
    const newChat = new ChatModel({
      members: [req.body.senderId, req.body.receiverId],
    });
    try {
      const result = await newChat.save();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  };
  
  //get chat of a user
  exports.userChats = async (req, res) => {
    try {
      const chat = await ChatModel.find({
        members: { $in: [req.params.userId] },
      });
      res.status(200).json(chat);
    } catch (error) {
      res.status(500).json(error);
    }
  };
  //get chat of two users
  exports.findChat = async (req, res) => {
    try {
      const chat = await ChatModel.findOne({
        members: { $all: [req.params.firstId, req.params.secondId] },
      });
      res.status(200).json(chat)
    } catch (error) {
      res.status(500).json(error)
    }
  };


  exports.getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const searchQuery = req.query.query;

        // Construct a regex pattern to perform a case-insensitive search
        const regex = new RegExp(searchQuery, 'i');

        let filteredUsers;

        if (searchQuery) {
            filteredUsers = await User.find({
                _id: { $ne: loggedInUserId },
                $or: [
                    { firstName: { $regex: regex } },
                    { lastName: { $regex: regex } },
                    { email: { $regex: regex } }
                ]
            }).select("-password");
        } else {
            filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
        }

        res.status(200).json(filteredUsers);
    } catch (error) {
        console.error("Error in getUsersForSidebar: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.deleteChat = async (req, res) => {
  try {
    // Find the chat by its ID
    const chat = await ChatModel.findById(req.params.chatId);

    // Check if the chat exists
    if (!chat) {
      return res.status(404).json({ error: "Chat not found" });
    }

    // Check if the requester is authorized to delete the chat
    // You may implement your own logic for authorization here

    // Delete the chat
    await chat.remove();

    res.status(200).json({ message: "Chat deleted successfully" });
  } catch (error) {
    console.error("Error in deleteChat: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};