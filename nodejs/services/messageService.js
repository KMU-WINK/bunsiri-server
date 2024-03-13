const messageModel = require("../models/messageModel");
const chatRoomModel = require("../models/chatRoomModel");
const userModel = require("../models/userModel");
const boardModel = require("../models/boardModel");

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

  async createMessage(userId, boardId, content) {


    const board = await boardModel.findOne({
      _id: boardId
    }).exec();

    const boardOwner = await userModel.findOne({
      _id: board.userId
    }).exec();

    const chatRoom = await chatRoomModel.findOne({
      boardId: boardId,
      $or: [
        { userId: userId },
        { userId: board.userId }
      ]
    }).exec();

    const sender = await userModel.findOne({
      _id: userId
    }).exec();

    const recipient = await userModel.findOne({
      _id: board.userId
    }).exec();

    let newMessage;

    console.log(chatRoom);

    if (chatRoom) {

      //받은 사람이 작성자일때, 보낸 사람은 user 또는 sender
      if (board.userId === recipient._id){
        newMessage = new messageModel({
          chatRoomId: chatRoom._id,
          senderId: userId,
          senderNickname: sender.nickname,
          recipientId: board.userId,
          recipientNickname: recipient.nickname,
          content: content,
        });

        chatRoom.lastChat = content;
        chatRoom.lastChatTime = Date.now();
        chatRoom.save();
      } else {
        newMessage = new messageModel({
          chatRoomId: chatRoom._id,
          senderId: board.userId,
          senderNickname: sender.nickname,
          recipientId: board.userId,
          recipientNickname: boardOwner.nickname,
          content: content,
        });

        chatRoom.lastChat = content;
        chatRoom.lastChatTime = Date.now();
        chatRoom.save();

      }
    } else {
      const newChatRoom = new chatRoomModel({
        boardId: boardId,
        boardOwnerId: recipient._id,
        userId: userId,
        sendNickname: sender.nickname,
        lastChat: content,
        lastChatTime: Date.now()
      })

      newChatRoom.save();

      newMessage = new messageModel({
        chatRoomId: newChatRoom._id,
        senderId: userId,
        senderNickname: sender.nickname,
        recipientId: board.userId,
        recipientNickname: recipient.nickname,
        content: content
      });
    }

    console.log(newMessage)

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
