const boardService = require("../services/boardService");

class BoardController {
  async post(req, res) {
    try {
      const { userID, boardID, content, boardImages, location, gift } =
        req.body;
      const savedBoard = await boardService.createBoard(
        userID,
        boardID,
        content,
        boardImages,
        location,
        gift
      );
      res.json(savedBoard);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async get(req, res) {
    try {
      const boardID = req.params.boardID;
      const board = await boardService.getBoardById(boardID);
      res.json({ board, images: board.imageFilenames });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async patch(req, res) {
    try {
      const boardID = req.params.boardID;
      const updatedBoard = await boardService.updateBoard(boardID, req.body);
      res.json(updatedBoard);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const boardID = req.params.boardID;
      const result = await boardService.deleteBoard(boardID);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new BoardController();
