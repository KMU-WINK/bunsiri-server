const messageService = require("../services/messageService");

const getAllMessages = async (req, res) => {
  try {
    const messages = await messageService.getAllMessages();
    res.send(messages);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const getAllMessagesByChatRoomId = async (req, res) => {
  try {
    const chatRoomId = req.params.chatRoomId;
    const messages = await messageService.getAllMessagesByChatRoomId(chatRoomId);
    res.send(messages);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const getMessageById = async (req, res) => {
  try {
    const messageId = req.params.id;
    const message = await messageService.getMessageById(messageId);
    res.send(message);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const createMessage = async (req, res) => {
  try {
    const userId = req.body.userId;
    const boardId = req.body.boardId;
    const content = req.body.content;
    const chatroomId = req.body.chatroomId;
    const newMessage = await messageService.createMessage(userId, boardId, content, chatroomId);
    res.send(newMessage);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const updateMessage = async (req, res) => {
  try {
    const messageId = req.params.id;
    const updatedMessage = await messageService.updateMessage(
      messageId,
      req.body
    );
    res.send(updatedMessage);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const deleteMessage = async (req, res) => {
  try {
    const messageId = req.params.id;
    const result = await messageService.deleteMessage(messageId);
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
};

module.exports = {
  getAllMessages,
  getAllMessagesByChatRoomId,
  getMessageById,
  createMessage,
  updateMessage,
  deleteMessage,
};
