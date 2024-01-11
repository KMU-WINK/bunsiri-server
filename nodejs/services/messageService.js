const messageModel = require("../models/messageModel");

class MessageService {
  getAllMessages() {
    return messageModel.find();
  }

  getMessageById(messageId) {
    return messageModel.findById(messageId);
  }

  createMessage(messageData) {
    const newMessage = new messageModel(messageData);
    return newMessage.save();
  }

  updateMessage(messageId, messageData) {
    return messageModel.findByIdAndUpdate(messageId, messageData, {
      new: true,
    });
  }

  deleteMessage(messageId) {
    return messageModel.findByIdAndDelete(messageId);
  }
}

module.exports = new MessageService();
