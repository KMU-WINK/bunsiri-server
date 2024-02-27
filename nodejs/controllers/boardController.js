const boardService = require("../services/boardService");

class BoardController {
  post = async (req, res) => {
    try {
      const { userId, title, content, location, address, reward, tab } =
        req.body;
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
        address,
        reward,
        createTimeString,
        tab
      );
      res.json({ _id: savedBoard._id });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  getBoard = async (req, res) => {
    try {
      const _id = req.params.boardId;
      const board = await boardService.getBoardById(_id);
      res.json({ board });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  getBoardByUserId = async (req, res) => {
    try {
      const userId = req.params.userId;
      const boards = await boardService.getBoardsByUserId(userId);
      res.json({ boards });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  getBoardByLocation = async (req, res) => {
    try {
      const location = req.params.location;
      const boards = await boardService.getBoardsByLocation(location);
      res.json({ boards });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  getBoardByTab = async (req, res) => {
    try {
      const tab = req.params.tab;
      const boards = await boardService.getBoardsByTab(tab);
      res.json({ boards });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  patch = async (req, res) => {
    try {
      const _id = req.params.boardId;
      const updatedBoard = await boardService.updateBoard(_id, req.body);
      res.json(updatedBoard);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  delete = async (req, res) => {
    try {
      const _id = req.params.boardId;
      const result = await boardService.deleteBoard(_id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
}

module.exports = new BoardController();
