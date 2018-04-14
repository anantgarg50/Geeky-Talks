const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    index: {
      unique: true
    }
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    index: {
      unique: true
    },
    required: true
  },
  privilege: {
    type: String,
    default: "user"
  },
  posts: [String],
  bookmarks: [String]
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
