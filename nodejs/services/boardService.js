const Board = require("../models/boardModel");

class BoardService {
  createBoard = async (
    userId,
    title,
    content,
    boardImages,
    location,
    reward,
    createTime
  ) => {
    try {
      const newBoard = new Board({
        userId,
        title,
        content,
        boardImages,
        location,
        reward,
        createTime,
      });

      const savedBoard = await newBoard.save();
      return savedBoard;
    } catch (error) {
      throw error;
    }
  };

  getBoardById = async (boardId) => {
    try {
      const board = await Board.findOne(boardId);
      if (!board) {
        throw new Error("게시물을 찾을 수 없습니다.");
      }
      return board;
    } catch (error) {
      throw error;
    }
  };

  updateBoard = async (boardId, updateData) => {
    try {
      const updatedBoard = await Board.findOneAndUpdate(boardId, updateData, {
        new: true,
      });
      if (!updatedBoard) {
        throw new Error("게시물을 찾을 수 없습니다.");
      }
      return updatedBoard;
    } catch (error) {
      throw error;
    }
  };

  deleteBoard = async (boardId) => {
    try {
      const deletedBoard = await Board.findOneAndDelete(boardId);
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
