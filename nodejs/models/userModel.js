// 예시 코드, 실제 프로젝트에 맞게 수정 필요
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  // 다른 사용자 속성들 추가
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
