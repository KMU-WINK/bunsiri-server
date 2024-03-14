const Board = require("../models/boardModel");
const ChatRoom = require("../models/chatRoomModel");
const User = require("../models/userModel");
const messageModel = require("../models/messageModel");

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
      const chatRoom = await ChatRoom.findOne({
        _id: chatRoomId
      });
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
      const board = await Board.findOne({ _id : boardId });

      const chatRooms = await ChatRoom.find({ boardId: boardId });
      const response = {
        title: board.title,
        tab: board.tab,
        isRewardGiven: board.isRewardGiven,
        chatRooms: chatRooms
      };
      console.log(response);
      return response
    } catch (error) {
      throw error;
    }
  };

  getChatRoomsByUserId = async (userId) => {
    try {
      const chatRooms = await ChatRoom.find({
        $or: [
          {
            boardOwnerId: userId
          },
          {
            userId: userId
          }
        ]
      });
      return chatRooms;
    } catch (error) {
      throw error;
    }
  };

  createChatRoom = async (boardId, userId) => {
    try {
      const board = await Board.findOne({
        _id: boardId
      });
      const boardOwnerId = board.userId;

      const newChatRoom = new ChatRoom({
        boardId: boardId,
        boardOwnerId: boardOwnerId,
        userId: userId,
      });

      const savedChatRoom = await newChatRoom.save();
      return savedChatRoom;
    } catch (error) {
      throw error;
    }
  };

  updateChatRoom = async (chatroomId) => {
    try {
      const updatedChatRoom = await ChatRoom.findByIdAndUpdate(
          chatroomId, // 쿼리 조건
          { $set: { isRewarded: true } }, // 업데이트 내용
          { new: true } // 업데이트 후 최신 문서를 반환하도록 설정
      );

      if (updatedChatRoom) {
        console.log("isRewarded가 True로 업데이트되었습니다.");
        return updatedChatRoom;
      } else {
        console.log("채팅방을 찾을 수 없습니다.");
        return null;
      }

      const chatRoom = await ChatRoom.findOne({ _id: chatroomId });

      const board = await Board.findOne({
        _id: chatRoom.boardId
      })

      board.isRewarded = true;

      board.save();

    } catch (error) {
      console.error("isRewarded 업데이트 중 오류가 발생했습니다:", error);
      throw error; // 오류를 상위 호출자에게 전파
    }
  }

  deleteChatRoomById = async (chatRoomId) => {
    try {
      const deletedChatRoom = await ChatRoom.findOneAndDelete({
        _id: chatRoomId
      });
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
