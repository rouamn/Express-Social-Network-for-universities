
const  MessageModel  = require ("../Models/messageModel.js");

//add message to a chat

//add message to a chat
exports.addMessage = async (req, res) => {
  const { chatId, senderId, type, text, video, file, attachment } = req.body; // Corrected attribute names
  const message = new MessageModel({
    chatId,
    senderId,
    type,
    text,
    video,
    file,
    attachment, // Corrected attribute name
  
  });
  try {
    const result = await message.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

  //get messages of a chat by the chat id
  exports.getMessages = async (req, res) => {
    const { chatId } = req.params;
    try {
      const result = await MessageModel.find({ chatId });
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  };