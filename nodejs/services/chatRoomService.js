const Board = require("../models/boardModel");
const ChatRoom = require("../models/chatRoomModel");

class ChatRoomService {
  getAllChatRooms = async () => {
    try {
      const chatRooms = await ChatRoom.find();
      return chatRooms;
    } catch (error) {
      throw error;
    }
  };

  getChatRoomById = async (chatRoomId) => {
    try {
      const chatRoom = await ChatRoom.findOne(chatRoomId);
      if (!chatRoom) {
        throw new Error("채팅방을 찾을 수 없습니다.");
      }
      return chatRoom;
    } catch (error) {
      throw error;
    }
  };

  getChatRoomsByBoardId = async (boardId) => {
    try {
      const chatRooms = await ChatRoom.find({
        boardId: boardId
      });
      return chatRooms;
    } catch (error) {
      throw error;
    }
  };

  getChatRoomsByUserId = async (userId) => {
    try {
      const chatRooms = await ChatRoom.find({
        $or: [
          { boardOwnerId: userId },
          { userId: userId }
        ]
      });
      return chatRooms;
    } catch (error) {
      throw error;
    }
  };

  createChatRoom = async (boardId, userId) => {
    try {
      const board = await Board.findOne(boardId);
      const boardUserId = board.userId;
      const newChatRoom = new ChatRoom({
        boardId,
        boardUserId,
        userId
      });

      const savedChatRoom = await newChatRoom.save();
      return savedChatRoom;
    } catch (error) {
      throw error;
    }
  };

  deleteChatRoomById = async (chatRoomId) => {
    try {
      const deletedChatRoom = await ChatRoom.findOneAndDelete(chatRoomId);
      if (!deletedChatRoom) {
        throw new Error("채팅방을 찾을 수 없습니다.");
      }
      return {
        message: "채팅방이 삭제되었습니다."
      };
    } catch (error) {
      throw error;
    }
  };
}

module.exports = new ChatRoomService();
