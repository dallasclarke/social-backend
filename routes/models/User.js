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
  birthday: { type: String, required: true },
});

module.exports = mongoose.model("User", UserSchema);
