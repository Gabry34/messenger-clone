const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema(
  {
    participants: {
      email1: { type: String, required: true },
      email2: { type: String, required: true },
    },
    messages: [
      {
        id: { type: String, required: true },
        by: { type: String, require: true },
        message: { type: String, required: true },
        time: { type: String, required: true },
        seen: { type: String, required: true },
        images: { type: Array },
        deleted: { type: Boolean },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Conversation = mongoose.models.Conversation
  ? mongoose.model("Conversation")
  : mongoose.model("Conversation", conversationSchema);

module.exports = Conversation;
