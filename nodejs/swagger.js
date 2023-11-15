const swaggerJSDoc = require("swagger-jsdoc");

// Swagger 정의
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Node.js API",
    version: "1.0.0",
    description: "APIs for managing users, boards, messages, and chat rooms",
  },
  servers: [
    {
      url: "http://localhost:8888", // 서버 주소 (포트는 프로젝트에 맞게 변경)
      description: "Development server",
    },
  ],
};

// Swagger JSDoc 설정
const options = {
  swaggerDefinition,
  apis: ["./routes/*.js"], // 라우터 파일들의 경로 (프로젝트에 맞게 변경)
};

// Swagger Spec 생성
const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
