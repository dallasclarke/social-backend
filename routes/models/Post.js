const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  user: {
    type: Schema.Type.ObjectId,
    ref: "User",
  },
  text: {
      type: String,
      required: true
  },
  date: {
      type: Date,
      default: Date.now
  }
});

module.exports = mongoose.model("Post", PostSchema);