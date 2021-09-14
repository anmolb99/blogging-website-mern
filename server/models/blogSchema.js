const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
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

const Blog = mongoose.model("blog", blogSchema);

module.exports = Blog;
