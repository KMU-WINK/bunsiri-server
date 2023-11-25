const express = require("express");
const router = express.Router();
const chatRoomController = require("../controllers/chatRoomController");
/**
 * @swagger
 * tags:
 *   name: ChatRooms
 *   description: API operations related to chat rooms
 */

/**
 * @swagger
 * /chatrooms:
 *   get:
 *     summary: Get all chat rooms
 *     description: Retrieve a list of all chat rooms.
 *     tags: [ChatRooms]
 *     responses:
 *       200:
 *         description: A list of chat rooms.
 *       500:
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /chatrooms/{id}:
 *   get:
 *     summary: Get chat room by ID
 *     description: Retrieve detailed information about a chat room based on ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     tags: [ChatRooms]
 *     responses:
 *       200:
 *         description: Detailed information about the chat room.
 *       404:
 *         description: Chat room not found.
 *       500:
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /chatrooms/board/{id}:
 *   get:
 *     summary: Get all chat rooms by Board ID.
 *     description: Retrieve a list of all chat rooms.
 *     tags: [ChatRooms]
 *     responses:
 *       200:
 *         description: A list of chat rooms.
 *       500:
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /chatrooms/user/{id}:
 *   get:
 *     summary: Get all chat rooms by User ID.
 *     description: Retrieve a list of all chat rooms.
 *     tags: [ChatRooms]
 *     responses:
 *       200:
 *         description: A list of chat rooms.
 *       500:
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /chatrooms:
 *   post:
 *     summary: Create a new chat room
 *     description: Create a new chat room with the provided details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ChatRoom'  # Reference to ChatRoom schema
 *     tags: [ChatRooms]
 *     responses:
 *       201:
 *         description: Chat room created successfully.
 *       400:
 *         description: Bad Request.
 *       500:
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /chatrooms/{id}:
 *   delete:
 *     summary: Delete chat room by ID
 *     description: Delete a chat room based on ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     tags: [ChatRooms]
 *     responses:
 *       204:
 *         description: Chat room deleted successfully.
 *       404:
 *         description: Chat room not found.
 *       500:
 *         description: Internal Server Error.
 */

// 채팅방 목록 조회
router.get("/", chatRoomController.getAllChatRooms);

// 채팅방 상세 정보 조회
router.get("/:id", chatRoomController.getChatRoomById);

// 채팅방 상세 정보 조회 (게시글 기준)
router.get("/board/:id", chatRoomController.getChatRoomsByBoardId);

// 채팅방 상세 정보 조회 (참여자 기준)
router.get("/user/:id", chatRoomController.getChatRoomsByUserId);

// 채팅방 생성
router.post("/", chatRoomController.createChatRoom);

// 채팅방 삭제
router.delete("/:id", chatRoomController.deleteChatRoom);

module.exports = router;
