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
 *     summary: 모든 채팅방 불러오기
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
 *     summary: 특정 채팅방 읽어오기
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
 * /chatrooms/board/{boardId}:
 *   get:
 *     summary: 해당 게시글의 모든 채팅방 불러오기
 *     description: Retrieve a list of all chat rooms.
 *     parameters:
 *       - in: path
 *         name: boardId
 *         required: true
 *         schema:
 *           type: string
 *     tags: [ChatRooms]
 *     responses:
 *       200:
 *         description: A list of chat rooms.
 *       500:
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /chatrooms/user/{userId}:
 *   get:
 *     summary: 해당 유저가 참여한 모든 채팅방 불러오기
 *     description: Retrieve a list of all chat rooms.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
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
 *     summary: 새로운 채팅방 만들기
 *     description: Create a new chat room with the provided details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/models/chatRoomModel'  # Reference to ChatRoom schema
 *           example:
 *             boardId: "boardId"
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
 *     summary: 채팅방 삭제하기
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
router.get("/board/:boardId", chatRoomController.getChatRoomsByBoardId);

// 채팅방 삭제
router.delete("/:id", chatRoomController.deleteChatRoom);

module.exports = router;
