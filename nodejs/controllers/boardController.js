const boardService = require("../services/boardService");

class BoardController {
  post = async (req, res) => {
    try {
      const { userId, title, content, location, reward } = req.body;
      const boardImages = req.files.map((file) => file.path);

      const offset = 1000 * 60 * 60 * 9;
      const createTime = new Date(new Date().getTime() + offset);
      let createTimeString = createTime.toISOString();
      createTimeString = createTimeString.slice(0, 19);

      const savedBoard = await boardService.createBoard(
        userId,
        title,
        content,
        boardImages,
        location,
        reward,
        createTimeString
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
