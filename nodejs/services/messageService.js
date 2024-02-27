const messageModel = require("../models/messageModel");

class MessageService {
  getAllMessages() {
    return messageModel.find();
  }

  getMessageById(messageId) {
    return messageModel.findById({ _id: messageId });
  }


  getAllMessagesByChatRoomId (chatRoomId) {
    return messageModel.find({ chatRoomId: chatRoomId });
  }

  createMessage(userId, reqBody) {
    const newMessage = new messageModel({
      chatRoomId: reqBody.chatRoomId,
      senderId: userId,
      recipientId: reqBody.recipientId,
      content: reqBody.content,
    });
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
