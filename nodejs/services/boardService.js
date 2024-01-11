const Board = require("../models/boardModel");

class BoardService {
  createBoard = async (
    userId,
    title,
    content,
    boardImages,
    location,
    reward,
    createTime,
    tab
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
        tab,
      });

      const savedBoard = await newBoard.save();
      return savedBoard;
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
