const mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
var SALT_WORK_FACTOR = 10;

const Schema = mongoose.Schema;

let userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    trim: true,
    index: {
      unique: true,
      partialFilterExpression: { userId: { $type: "string" } }
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

userSchema.pre("save", function(next) {
  var user = this;
  if (!user.isModified("password")) return next();

  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});

module.exports = userModel;
