require("dotenv").config(); // dotenv 패키지를 사용하여 .env 파일의 환경 변수를 로드

const express = require("express");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger"); // swagger.js 파일을 불러옴

const userRoutes = require("./routes/userRoutes");
const boardRoutes = require("./routes/boardRoutes");
const messageRoutes = require("./routes/messageRoutes");
const chatRoomRoutes = require("./routes/chatRoomRoutes");

const mongoose = require("mongoose");
const passport = require('passport');
const session = require('express-session');
const passportConfig = require('./passport')

const app = express();
const port = process.env.PORT || 8888;

//Passport 초기화
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
}));
app.use(passport.initialize());
app.use(passport.session());

passportConfig();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// MongoDB 연결 설정
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// MongoDB 연결 확인
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Swagger UI를 /api-docs 경로에 추가x
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 각 엔터티에 대한 라우터 등록
app.use("/users", userRoutes);
app.use("/boards", boardRoutes);
app.use("/messages", messageRoutes);
app.use("/chatrooms", chatRoomRoutes);

// 기타 애플리케이션 미들웨어 및 라우트 추가
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

//로그인 테스트용
app.set("view engine", "ejs");
