// 예시 코드, 실제 프로젝트에 맞게 수정 필요
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
  },
  nickname: {
    type: String,
    required: true,
  },
  major: {
    type: String,
    required: true,
  }
  // 다른 사용자 속성들 추가
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
