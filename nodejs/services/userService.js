// 예시 코드, 실제 프로젝트에 맞게 수정 필요
const User = require("../models/userModel");

class UserService {
  getAllUsers() {
    // 사용자 목록 조회 로직
    return User.find();
  }

  getUserById(userId) {
    // 특정 사용자 조회 로직
    return User.findById(userId);
  }

  getUserByEmail(userEmail) {
    // 특정 이메일로 사용자 조회 로직
    return User.findOne({ email: userEmail });
  }

  createUser = async (email, username, nickname, major) => {
    try {
      const newUser = new User({
        email: email,
        username: username,
        nickname: nickname,
        major: major,
      });
      newUser.save();
      return newUser;

    } catch (error) {
      throw error;
    }
  }

  updateUser(userId, userData) {
    // 사용자 업데이트 로직
    return User.findByIdAndUpdate(userId, userData, { new: true });
  }

  deleteUser(userId) {
    // 사용자 삭제 로직
    return User.findByIdAndDelete(userId);
  }
}

module.exports = new UserService();
