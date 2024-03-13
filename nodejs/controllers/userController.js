// 이 부분은 필요한 패키지나 모듈을 불러오는 부분입니다.
const userService = require("../services/userService");
const validator = require('validator');

// 사용자 목록 조회 컨트롤러
const getAllUsers = (req, res) => {
  // 여기에 사용자 목록을 조회하는 로직을 추가합니다.
  res.json(userService.getAllUsers());
};

// 사용자 상세 정보 조회 컨트롤러
const getUserById = (req, res) => {
  // 여기에 사용자 상세 정보를 조회하는 로직을 추가합니다.
  res.send("Get user by ID");
};

const getUserByEmail =  (userEmail) => {
  try {
    const user = userService.getUserByEmail(userEmail);
    return user;
  } catch (error) {
    throw new Error('Failed to get user by email');
  }
}

// 사용자 생성 컨트롤러
const createUser = async (googleEmail, username, nickname, major) => {
  try {
    allowedDomain = 'kookmin.ac.kr';
    if (!validator.isEmail(googleEmail) || !googleEmail.endsWith(`@${allowedDomain}`)) {
      throw new Error('국민대학교 이메일만 가입 가능합니다');
    }
    const user = await userService.createUser(
          googleEmail,
          username,
          nickname,
          major,
      )
    return user;
  } catch (err) {

  }
};

// 사용자 업데이트 컨트롤러
const updateUser = (req, res) => {
  // 여기에 사용자 정보를 업데이트하는 로직을 추가합니다.
  res.send("Update user");
};

// 사용자 삭제 컨트롤러
const deleteUser = async (userEmail, res) => {
  userService.deleteUser(userEmail);
  res.send("Delete user");
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserByEmail,
};
