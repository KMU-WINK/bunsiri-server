// 예시 코드, 실제 프로젝트에 맞게 수정 필요
const UserModel = require("../models/userModel");

class UserService {
  getAllUsers() {
    // 사용자 목록 조회 로직
    return UserModel.find();
  }

  getUserById(userId) {
    // 특정 사용자 조회 로직
    return UserModel.findById(userId);
  }

  createUser(userData) {
    // 사용자 생성 로직
    const newUser = new UserModel(userData);
    return newUser.save();
  }

  updateUser(userId, userData) {
    // 사용자 업데이트 로직
    return UserModel.findByIdAndUpdate(userId, userData, { new: true });
  }

  deleteUser(userId) {
    // 사용자 삭제 로직
    return UserModel.findByIdAndDelete(userId);
  }
}

module.exports = new UserService();
