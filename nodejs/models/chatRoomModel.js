const mongoose = require("mongoose");

// chatRoomShema
const chatRoomSchema = new mongoose.Schema({
    boardId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Board",
        required: true
    },
    boardOwnerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    createdAt: {
        type: mongoose.Schema.Types.Date,
        default: mongoose.Schema.Types.Date.now,
        required: true
    }
});

// ChatRoom model 생성
const ChatRoom = mongoose.model("ChatRoom", chatRoomSchema);

module.exports = ChatRoom;
