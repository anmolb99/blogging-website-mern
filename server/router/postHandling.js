const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs-extra");
const Blog = require("../models/blogSchema");
const authentication = require("../middleware/authentication");

multer({
  limits: { fieldSize: 25 * 1024 * 1024 },
});

const blogStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = `./BlogImages`;
    //console.log(req.body.date);
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    uniqNm = `${Date.now()}-blog-${file.originalname}`;
    cb(null, uniqNm);

    return {
      filename: uniqNm,
    };
  },
});

const blogUpload = multer({ storage: blogStorage });

router.post("/post_blog", blogUpload.single("BLOGPOST"), (req, res) => {
  try {
    // console.log(req.file.filename);
    const blogImage = req.file != undefined ? `${req.file.filename}` : "";
    const data = {
      blogImage: blogImage,
      blogTitle: req.body.blogTitle,
      blogDescription: req.body.blogDescription,
      blogCategory: req.body.blogCategory,
      blogOwnerId: req.body.blogOwnerId,
      blogUsername: req.body.blogUsername,
    };
    const post = new Blog(data);
    post
      .save()
      .then(() => {
        res.status(201).json({
          status: 1,
          msg: "blog posted successfully",
          category: req.body.category,
        });
      })
      .catch((err) => {
        res.status(400).json({
          status: 0,
          msg: "please try again",
          errMsg: err,
        });
        console.log(err);
      });
  } catch (err) {
    console.log(err);
  }
});

router.get("/get_blogs", async (req, res) => {
  const { category } = req.query;
  let data;
  try {
    if (category) {
      data = await Blog.find({ blogCategory: category }).sort({ blogTime: -1 });
    } else {
      data = await Blog.find({}).sort({ blogTime: -1 });
    }
    res.status(200).json(data);
  } catch (err) {
    console.log("error while getting blogs is ", err);
  }
});

router.post("/particular_blog/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    res.status(200).json(blog);
  } catch (error) {
    console.log(error);
  }
});

// router.post("/user_blogs/:id", async (req, res) => {
//   // try {
//   //   const data = await Blog.findOne({ blogOwnerId: req.params.id });
//   // } catch (error) {
//   //   console.log(error);
//   // }
//   console.log(req.params.id);
// });

module.exports = router;
