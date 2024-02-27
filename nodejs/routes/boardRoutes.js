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
 *     summary: 모든 게시글 불러오기
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
 *     summary: 특정 게시글 읽어오기
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

// userId를 기준으로 특정 사용자가 작성한 게시물 모두 불러오기
/**
 * @swagger
 * /boards/user/{id}:
 *   get:
 *     summary: 특정 유저가 작성한 게시글 불러오기
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

/**
 * @swagger
 * /boards/location/{location}:
 *   get:
 *     summary: 위치에 따라 게시글 불러오기
 *     description: Retrieve detailed information about a board based on ID.
 *     parameters:
 *       - in: path
 *         name: location
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

/**
 * @swagger
 * /boards/tab/{tab}:
 *   get:
 *     summary: Tab(물건을 찾아요/주인을 찾아요)에 따라 게시글 불러오기
 *     description: Retrieve detailed information about a board based on ID.
 *     parameters:
 *       - in: path
 *         name: tab
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

/**
 * @swagger
 * /boards:
 *   post:
 *     summary: 게시글 작성
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

/**
 * @swagger
 * /boards/{id}:
 *   patch:
 *     summary: 게시글 수정하기
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

/**
 * @swagger
 * /boards/{id}:
 *   delete:
 *     summary: 게시글 삭제하기
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

router.get("/:boardId", boardController.getBoard);

router.get("/user/:userId", boardController.getBoardByUserId);

router.get("/location/:location", boardController.getBoardByLocation);

router.get("/tab/:tab", boardController.getBoardByTab);

router.post("/", uploads.array("images", 3), boardController.post);

router.patch("/:boardId", boardController.patch);

router.delete("/:boardId", boardController.delete);

module.exports = router;
