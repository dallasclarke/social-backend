const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
  password: { type: String, required: true },
  dateJoined: {
    type: Date,
    default: Date.now,
  },
  birthday: { type: Date, required: true },
  bio: { type: String, default: "Share a bit about you!!" },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  city: { type: String, default: "City" },
  state: { type: String, default: "State" },
  avatar: {
    type: String,
    default:
      "https://www.minervastrategies.com/wp-content/uploads/2016/03/default-avatar.jpg"
  },
});

module.exports = mongoose.model("User", UserSchema);
