const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let answerSchema = new Schema({
  body: {
    type: String,
    required: true
  },
  upVotes: {
    type: Number,
    default: 0
  },
  downVotes: {
    type: Number,
    default: 0
  }
});

let postSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  postedBy: {
    type: String,
    required: true
  },
  postedOn: {
    type: Date,
    default: Date.now
  },
  answers: [answerSchema]
});

const postModel = mongoose.model("Post", postSchema);

module.exports = postModel;
