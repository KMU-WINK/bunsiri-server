const chatRoomService = require("../services/chatRoomService");
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
    const chatRoom = await chatRoomService.getChatRoomById(req.params.chatRoomId);
    res.json(chatRoom);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

// 채팅방 상세 정보 조회 컨트롤러 (게시글 ID 기준)
const getChatRoomsByBoardId = async (req, res) => {
  try {
    const chatRooms = await chatRoomService.getChatRoomsByBoardId(req.params.boardId);
    res.json(chatRooms);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

// 채팅방 상세 정보 조회 컨트롤러 (참여자 ID 기준)
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
    const userId = req.user._id;
    const savedChatRoom = await chatRoomService.createChatRoom(
      boardId,
      userId
    );
    res.json(savedChatRoom);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
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
  deleteChatRoom,
};
