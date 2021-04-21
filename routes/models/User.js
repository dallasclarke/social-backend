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
      type: Date
  },
  birthday: { type: Date, required: true },
  bio: { type: String },
  city: { type: String },
  state: { type: String },
  
});

module.exports = mongoose.model("User", UserSchema);
