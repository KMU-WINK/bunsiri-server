const mongoose = require("mongoose");

// LocationType Enum 정의
//   SEONGGOK_LIBRARY: '성공도서관',
//   MILAE_GWAN: '미래관',
//   GYEONGYEONG_GWAN: '경영관',
//   BUGAG_GWAN: '북악관',
//   GLOBAL_CENTER: '글로벌센터',
//   GONGHAG_GWAN: '공학관',
//   TENNIS_COURT: '테니스장',
//   BASKETBALL_COURT: '농구장',
//   PLAYGROUND: '운동장',
//   YESUL_GWAN: '예술관',
//   GYEONGSANG_GWAN: '경상관',
//   GUGJE_GWAN: '국제관',
//   JOHYEONG_GWAN: '조형관',
//   BONBU_GWAN: '본부관',
//   BEOBHAG_GWAN: '법학관',
//   GWAHAG_GWAN: '과학관',
//   HWILANG_GWAN: '휘랑관',
//   YEONGBIN_GWAN: '영빈관',
//   SAENGHWAL_GWAN_C_DONG: '생활관 C동',
//   SAENGHWAL_GWAN_A_DONG: '생활관 A동',
// };

// boardShema
const boardSchema = new mongoose.Schema({
  id_: { type: mongoose.Schema.Types.ObjectId },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // User 스키마에서의 userID와 연결
  content: { type: String, required: true },
  boardImages: { type: [String] },
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
