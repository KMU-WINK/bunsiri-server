const chatRoomService = require("../services/chatRoomService");
const messageService = require("../services/messageService");
// 필요한 패키지나 모듈을 불러오는 부분

// 채팅방 목록 조회 컨트롤러
const getAllChatRooms = async (req, res) => {
  try {
    const chatRooms = await chatRoomService.getAllChatRooms();
    res.json(chatRooms);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

// 채팅방 상세 정보 조회 컨트롤러
const getChatRoomById = async (req, res) => {
  try {
    const chatRoomId = req.params.chatRoomId
    const chatRoom = await chatRoomService.getChatRoomById(chatRoomId);
    res.json(chatRoom);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

// 채팅방 상세 정보 조회 컨트롤러 (특정 게시글에서 생성된 모든 채팅방 목록)
const getChatRoomsByBoardId = async (req, res) => {
  try {
    const boardId = req.params.boardId;
    const chatRooms = await chatRoomService.getChatRoomsByBoardId(boardId);
    res.json(chatRooms);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

// 채팅방 상세 정보 조회 컨트롤러 (현재 사용자가 참여한 모든 채팅방 목록)
const getChatRoomsByUserId = async (req, res) => {
  try {
    const chatRooms = await chatRoomService.getChatRoomsByUserId(req.params.userId);
    res.json(chatRooms);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

// 채팅방 생성 컨트롤러
const createChatRoom = async (req, res) => {
  try {
    const { boardId } = req.body;
    const savedChatRoom = await chatRoomService.createChatRoom(
      boardId,
      req.user._id
    );
    res.json(savedChatRoom);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

const updateChatRoom = async (req, res) => {
  try {
    const chatroomId = req.body.chatroomId;
    const updatedChat = await chatRoomService.updateChatRoom(chatroomId);
    res.send(updatedChat);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// 채팅방 삭제 컨트롤러
const deleteChatRoom = async (req, res) => {
  try {
    const result = await chatRoomService.deleteChatRoomById(req.params.chatRoomId);
    res.json(result);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

module.exports = {
  getAllChatRooms,
  getChatRoomById,
  getChatRoomsByBoardId,
  getChatRoomsByUserId,
  createChatRoom,
  updateChatRoom,
  deleteChatRoom,
};
