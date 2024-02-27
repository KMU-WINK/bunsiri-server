const express = require("express");
const router = express.Router();
const boardController = require("../controllers/boardController");
const multer = require("multer");
const path = require("path");

const uploads = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "uploads/");
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

/**
 * @swagger
 * tags:
 *   name: Boards
 *   description: API operations related to boards
 * definitions:
 *   Board:
 *     type: object
 *     properties:
 *       userId:
 *         type: string
 *         description: The ID of the user who created the board.
 *       title:
 *         type: string
 *         description: The title of the board.
 *       content:
 *         type: string
 *         description: The content of the board.
 *       boardImages:
 *         type: array
 *         items:
 *           type: object
 *         description: Array of board images.
 *       location:
 *         type: string
 *         enum:
 *           - 성곡도서관
 *           - 글로벌센터
 *           - 공학관
 *           - 테니스장
 *           - 농구장
 *           - 운동장
 *           - 복지관
 *           - 미래관
 *           - 예술관
 *           - 경상관
 *           - 국제관
 *           - 경영관
 *           - 북악관
 *           - 조형관
 *           - 본부관
 *           - 법학관
 *           - 과학관
 *           - 휘랑관
 *           - 영빈관
 *           - 생활관 C동
 *           - 생활관 A동
 *         description: Location of the board.
 *       address:
 *         type: string
 *         description: Address associated with the board.
 *       reward:
 *         type: string
 *         description: Reward for the board.
 *       matching:
 *         type: boolean
 *         default: false
 *         description: Indicates if the board is matched.
 *       createTime:
 *         type: string
 *         description: Time when the board was created.
 *       tab:
 *         type: string
 *         enum:
 *           - 주인을 찾아요
 *           - 물건을 찾아요
 *         description: Category of the board.
 *   BoardsArray:
 *     type: array
 *     items:
 *       $ref: '#/definitions/Board'
 */

/**
 * @swagger
 * /boards:
 *   get:
 *     summary: Get all boards
 *     description: Retrieve a list of all boards.
 *     tags: [Boards]
 *     responses:
 *       200:
 *         description: A list of boards.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/BoardsArray'
 *       500:
 *         description: Internal Server Error.
 */

/**
 * @swagger
 * /boards/{id}:
 *   get:
 *     summary: Get board by ID
 *     description: Retrieve detailed information about a board based on ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     tags: [Boards]
 *     responses:
 *       200:
 *         description: Detailed information about the board.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Board'
 *       404:
 *         description: Board not found.
 *       500:
 *         description: Internal Server Error.
 */
router.get("/:boardId", boardController.getBoard);

// userId를 기준으로 특정 사용자가 작성한 게시물 모두 불러오기
/**
 * @swagger
 * /boards/user/{id}:
 *   get:
 *     summary: Get boards by userId
 *     description: Retrieve detailed information about a board based on ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     tags: [Boards]
 *     responses:
 *       200:
 *         description: Detailed information about the board.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/BoardsArray'
 *       404:
 *         description: Board not found.
 *       500:
 *         description: Internal Server Error.
 */
router.get("/user/:userId", boardController.getBoardByUserId);

/**
 * @swagger
 * /boards:
 *   post:
 *     summary: Create a new board
 *     description: Create a new board with the provided details.
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *          schema:
 *             $ref: '#/components/schemas/Board'  # Reference to ChatRoom schema
 *             type: object
 *             properties:
 *               userId:
 *                 type: String
 *               title:
 *                 type: String
 *               content:
 *                 type: String
 *               images:
 *                 type: array
 *                 items:
 *                   type: file
 *               location:
 *                 type: String
 *               reward:
 *                 type: String
 *               tab:
 *                 type: String
 *     tags: [Boards]
 *     responses:
 *       201:
 *         description: Board created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Board'
 *       400:
 *         description: Bad Request.
 *       500:
 *         description: Internal Server Error.
 */
router.post("/", uploads.array("images", 3), boardController.post);

/**
 * @swagger
 * /boards/{id}:
 *   patch:
 *     summary: Update board by ID
 *     description: Update board information based on ID.
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
 *             $ref: '#/components/schemas/Board'  # Reference to Board schema
 *     tags: [Boards]
 *     responses:
 *       200:
 *         description: Board updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Board'
 *       404:
 *         description: Board not found.
 *       500:
 *         description: Internal Server Error.
 */
router.patch("/:boardId", boardController.patch);

/**
 * @swagger
 * /boards/{id}:
 *   delete:
 *     summary: Delete board by ID
 *     description: Delete a board based on ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     tags: [Boards]
 *     responses:
 *       204:
 *         description: Board deleted successfully.
 *       404:
 *         description: Board not found.
 *       500:
 *         description: Internal Server Error.
 */
router.delete("/:boardId", boardController.delete);

module.exports = router;
