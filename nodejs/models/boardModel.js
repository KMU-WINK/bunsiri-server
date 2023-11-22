const mongoose = require("mongoose");

// boardShema
const boardSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }, // User 스키마에서의 userID와 연결
  content: { type: String, required: true },
  boardImages: { type: [Object] },
  location: {
    type: String,
    enum: [
      "성곡도서관",
      "글로벌센터",
      "공학관",
      "테니스장",
      "농구장",
      "운동장",
      "복지관",
      "미래관",
      "예술관",
      "경상관",
      "국제관",
      "경영관",
      "북악관",
      "조형관",
      "본부관",
      "법학관",
      "과학관",
      "휘랑관",
      "영빈관",
      "생활관 C동",
      "생활관 A동",
    ],
    required: true,
  },
  gift: { type: String },
});

// board model 생성
const Board = mongoose.model("Board", boardSchema);

module.exports = Board;
