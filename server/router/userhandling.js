const express = require("express");
const Blog = require("../models/blogSchema");
const router = express.Router();
const User = require("../models/userSchema");
const authentication = require("../middleware/authentication");

router.post("/get_user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const blogs = await Blog.find({ blogOwnerId: req.params.id }).sort({
      blogTime: -1,
    });
    res.status(200).json({ user: user, blogs: blogs });
  } catch (error) {
    console.log(error);
  }
});

router.post("/get_username", authentication, (req, res) => {
  res.status(200).send(req.rootUser);
});

module.exports = router;
