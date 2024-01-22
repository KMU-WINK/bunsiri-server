// 이 부분은 필요한 패키지나 모듈을 불러오는 부분입니다.
const userService = require("../services/userService");
const validator = require('validator');

// 사용자 목록 조회 컨트롤러
const getAllUsers = (req, res) => {
  // 여기에 사용자 목록을 조회하는 로직을 추가합니다.
  res.send("Get all users");
};

// 사용자 상세 정보 조회 컨트롤러
const getUserById = (req, res) => {
  // 여기에 사용자 상세 정보를 조회하는 로직을 추가합니다.
  res.send("Get user by ID");
};

// 사용자 생성 컨트롤러
const createUser = async (googleEmail, additionalInfo, res) => {
  try {
    allowedDomain = 'kookmin.ac.kr';
    if (!validator.isEmail(googleEmail) || !googleEmail.endsWith(`@${allowedDomain}`)) {
      throw new Error('국민대학교 이메일만 가입 가능합니다');
    }
    let user = await userService.getUserByEmail(googleEmail); // 이메일로 찾는 로직 생성 필요
    if (!user) {
      user = await userService.createUser(
          googleEmail,
          additionalInfo.username,
          additionalInfo.nickname,
          additionalInfo.major,
      )
    }
    res.send(user); // 생성된 사용자 객체를 클라이언트에게 응답으로 보냅니다.
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
};
