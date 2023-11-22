// routes/boardImageRoutes.js

const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs"); // fs 모듈 추가
const router = express.Router();

// 이미지 저장할 폴더 생성
fs.mkdirSync("./uploads/", { recursive: true });

// Multer 설정
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // 이미지를 저장할 폴더 지정
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // 파일명을 고유하게 생성
  },
});

const upload = multer({ storage: storage });

/**
 * @swagger
 * tags:
 *   name: Uploads
 *   description: API operations related to image uploads
 */

/**
 * @swagger
 * /uploads/upload:
 *   post:
 *     summary: Upload images
 *     description: Upload images to the server.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     tags: [Uploads]
 *     responses:
 *       200:
 *         description: Images uploaded successfully.
 *       500:
 *         description: Internal Server Error.
 */
router.post("/upload", upload.array("images", 3), (req, res) => {
  // 업로드된 이미지의 파일명들을 클라이언트에게 반환
  const filenames = req.files.map((file) => file.filename);
  res.json({ filenames });
});

module.exports = router;
