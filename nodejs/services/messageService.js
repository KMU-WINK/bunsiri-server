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


  async getAllMessagesByChatRoomId (chatRoomId) {

    const messages = await messageModel.find({ chatRoomId: chatRoomId });

    const chatroom = await chatRoomModel.findOne({ _id : chatRoomId });

    const board = await boardModel.findOne({ _id : chatroom.boardId });


    const response = {
      boardIamges: board.boardImages,
      title: board.title,
      reward: board.reward,
      isRewarded: chatroom.isRewarded,
      boardId: board._id,
      messages: messages
    }

    return response;
  }

  async createMessage(userId, boardId, content, chatroomId) {


    const board = await boardModel.findOne({
      _id: boardId
    }).exec();


    const boardOwner = await userModel.findOne({
      _id: board.userId
    }).exec();

    console.log(board.userId);
    console.log(boardOwner);

    let chatRoom;

    if (chatroomId) {
      chatRoom = await chatRoomModel.findOne({
        _id: chatroomId
      }).exec();
    }

    const sender = await userModel.findOne({
      _id: userId
    }).exec();



    let newMessage;

    if (chatRoom) {
      const chatroomOwner = await userModel.findOne({
        _id: chatRoom.userId
      }).exec();

      //받은 사람이 작성자일때, 보낸 사람은 user 또는 sender
      if (board.userId != userId){
        newMessage = new messageModel({
          chatRoomId: chatRoom._id,
          senderId: userId,
          senderNickname: sender.nickname,
          recipientId: board.userId,
          recipientNickname: boardOwner.nickname,
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
          recipientId: chatroomOwner._id,
          recipientNickname: chatroomOwner.nickname,
          content: content,
        });

        chatRoom.lastChat = content;
        chatRoom.lastChatTime = Date.now();
        chatRoom.save();

      }
    } else {
      const newChatRoom = new chatRoomModel({
        boardId: boardId,
        boardOwnerId: boardOwner._id,
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
        recipientNickname: boardOwner.nickname,
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
