const Board = require("../models/boardModel");
const ChatRoom = require("../models/chatRoomModel");

class BoardService {
  createBoard = async (
    userId,
    nickname,
    title,
    content,
    boardImages,
    location,
    address,
    reward,
    createTime,
    tab
  ) => {
    try {
      const newBoard = new Board({
        userId,
        nickname,
        title,
        content,
        boardImages,
        location,
        address,
        reward,
        createTime,
        tab,
      });

      const savedBoard = await newBoard.save();
      return savedBoard;
    } catch (error) {
      throw error;
    }
  };

  getAllBoards = async () => {
    try {
      const boards = await Board.find();
      return boards;
    } catch (error) {
      throw error;
    }
  };

  getBoardById = async (_id) => {
    try {
      const board = await Board.findOne({ _id: _id });
      if (!board) {
        throw new Error("게시물을 찾을 수 없습니다.");
      }
      return board;
    } catch (error) {
      throw error;
    }
  };

  getBoardsByUserId = async (userId) => {
    try {
      const boards = await Board.find({ userId: userId });
      if (!boards.length) {
        throw new Error("해당 사용자가 작성한 게시물을 찾을 수 없습니다.");
      }
      return boards;
    } catch (error) {
      throw error;
    }
  };

  getBoardsByTabAndLocation = async (tab, locations) => {
    try {
      const boards = await Board.find({
        tab: tab,
        location: { $in: locations }
      });
      console.log(boards);
      if (!boards.length) {
        throw new Error("해당 위치로 작성한 게시물을 찾을 수 없습니다.");
      }
      return boards;
    } catch (error) {
      throw error;
    }
  };

  updateBoard = async (_id, updateData) => {
    try {
      const updatedBoard = await Board.findOneAndUpdate(
        { _id: _id },
        updateData,
        {
          new: true,
        }
      );
      if (!updatedBoard) {
        throw new Error("게시물을 찾을 수 없습니다.");
      }
      return updatedBoard;
    } catch (error) {
      throw error;
    }
  };

  deleteBoard = async (_id) => {
    try {
      const deletedBoard = await Board.findOneAndDelete({ _id: _id });
      if (!deletedBoard) {
        throw new Error("게시물을 찾을 수 없습니다.");
      }
      return { message: "게시물이 삭제되었습니다." };
    } catch (error) {
      throw error;
    }
  };
}

module.exports = new BoardService();
