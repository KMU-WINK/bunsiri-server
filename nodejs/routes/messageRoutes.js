const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");

/**
 * @swagger
 * tags:
 *   name: Messages
 *   description: API operations related to messages
 */

/**
 * @swagger
 * /messages:
 *   get:
 *     summary: Get all messages
 *     description: Retrieve a list of all messages.
 *     tags: [Messages]
 *     responses:
 *       200:
 *         description: A list of messages.
 *       500:
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /messages/{id}:
 *   get:
 *     summary: Get message by ID
 *     description: Retrieve detailed information about a message based on ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     tags: [Messages]
 *     responses:
 *       200:
 *         description: Detailed information about the message.
 *       404:
 *         description: Message not found.
 *       500:
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /messages:
 *   post:
 *     summary: Create a new message
 *     description: Create a new message with the provided details.
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/models/messageModel'  # Reference to Message schema
 *           example:
 *            chatRoomId: "chatRoomId"
 *            recipientId: "recipientUserId"
 *            content: "this is message."
 *
 *     tags: [Messages]
 *
 *     responses:
 *       201:
 *         description: Message created successfully.
 *       400:
 *         description: Bad Request.
 *       500:
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /messages/{id}:
 *   put:
 *     summary: Update message by ID
 *     description: Update message information based on ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/models/messageModel'  # Reference to Message schema
 *           example:
 *             sender: "senderUser"
 *             recipient: "revieverUser"
 *             content: "this is updated message."
 *     tags: [Messages]
 *     responses:
 *       200:
 *         description: Message updated successfully.
 *       404:
 *         description: Message not found.
 *       500:
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /messages/{id}:
 *   delete:
 *     summary: Delete message by ID
 *     description: Delete a message based on ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     tags: [Messages]
 *     responses:
 *       204:
 *         description: Message deleted successfully.
 *       404:
 *         description: Message not found.
 *       500:
 *         description: Internal Server Error.
 */

module.exports = router;

// 메시지 목록 조회
router.get("/", messageController.getAllMessages);

// 메시지 상세 정보 조회
router.get("/:id", messageController.getMessageById);

// 메시지 생성
router.post("/", messageController.createMessage);

// 메시지 업데이트
router.put("/:id", messageController.updateMessage);

// 메시지 삭제
router.delete("/:id", messageController.deleteMessage);

module.exports = router;
