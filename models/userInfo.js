import mongoose, { Schema } from "mongoose";

const userInfoSchema = new Schema(
  {
    email: String,
    name: String,
    surname: String,
    image: String,
    archived: Array,
    friends: Array,
  },
  {
    timestamps: true,
  }
);

const UserInfo =
  mongoose.models.UserInfo || mongoose.model("UserInfo", userInfoSchema);

export default UserInfo;
