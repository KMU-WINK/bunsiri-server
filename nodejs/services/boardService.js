// services/boardService.js
const Board = require("../models/boardModel");

class BoardService {
  async createBoard(userID, boardID, content, boardImages, location, gift) {
    try {
      const newBoard = new Board({
        userID,
        boardID,
        content,
        boardImages,
        location,
        gift,
      });

      const savedBoard = await newBoard.save();
      return savedBoard;
    } catch (error) {
      throw error;
    }
  }

  async getBoardById(boardID) {
    try {
      const board = await Board.findById(boardID);
      if (!board) {
        throw new Error("게시물을 찾을 수 없습니다.");
      }
      return board;
    } catch (error) {
      throw error;
    }
  }

  async updateBoard(boardID, updateData) {
    try {
      const updatedBoard = await Board.findByIdAndUpdate(boardID, updateData, {
        new: true,
      });
      if (!updatedBoard) {
        throw new Error("게시물을 찾을 수 없습니다.");
      }
      return updatedBoard;
    } catch (error) {
      throw error;
    }
  }

  async deleteBoard(boardID) {
    try {
      const deletedBoard = await Board.findByIdAndDelete(boardID);
      if (!deletedBoard) {
        throw new Error("게시물을 찾을 수 없습니다.");
      }
      return { message: "게시물이 삭제되었습니다." };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new BoardService();
