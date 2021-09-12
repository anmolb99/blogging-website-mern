const mongoose = require("mongoose");

const blogsSchema = new mongoose.Schema({
  blogTitle: {
    type: String,
    required: true,
  },
  blogText: {
    type: String,
    required: true,
  },
  blogImage: {
    type: String,
  },
  blogCategory: {
    type: String,
  },
  blogTime: {
    type: Date,
    default: Date.now,
  },
  blogURL: {
    type: String,
  },
});

const blogs = mongoose.model("blogs", blogsSchema, "blogs");

module.exports = blogs;
