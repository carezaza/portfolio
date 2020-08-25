const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true,
  },
  providerId: {
    type: Number,
    unique: true,
    required: true,
  },
  tokenVersion: {
    type: Number,
    default: 0,
  },
  joined: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Users", UserSchema);
