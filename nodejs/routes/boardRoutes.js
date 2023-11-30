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
 *       404:
 *         description: Board not found.
 *       500:
 *         description: Internal Server Error.
 */
router.get("/:boardID", boardController.get);

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
 *       400:
 *         description: Bad Request.
 *       500:
 *         description: Internal Server Error.
 */
router.post("/", uploads.array("images", 3), boardController.post);

/**
 * @swagger
 * /boards/{id}:
 *   put:
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
 *       404:
 *         description: Board not found.
 *       500:
 *         description: Internal Server Error.
 */
router.patch("/:boardID", boardController.patch);

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
router.delete("/:boardID", boardController.delete);

module.exports = router;
