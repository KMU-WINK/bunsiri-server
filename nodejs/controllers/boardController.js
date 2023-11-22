const boardService = require("../services/boardService");

class BoardController {
  post = async (req, res) => {
    try {
      const { userId, content, location, gift } = req.body;
      const boardImages = req.files;
      const savedBoard = await boardService.createBoard(
        userId,
        content,
        boardImages,
        location,
        gift
      );
      res.json(savedBoard);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  get = async (req, res) => {
    try {
      const boardId = req.params.boardId;
      const board = await boardService.getBoardById(boardId);
      res.json({ board, images: board.imageFilenames });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  patch = async (req, res) => {
    try {
      const boardId = req.params.boardId;
      const updatedBoard = await boardService.updateBoard(boardId, req.body);
      res.json(updatedBoard);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  delete = async (req, res) => {
    try {
      const boardId = req.params.boardId;
      const result = await boardService.deleteBoard(boardId);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
}

module.exports = new BoardController();
