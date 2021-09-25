const express = require("express");
const fs = require("fs-extra");
const Blog = require("../models/blogSchema");
const router = express.Router();
const User = require("../models/userSchema");
const authentication = require("../middleware/authentication");
const multer = require("multer");

multer({
  limits: { fieldSize: 25 * 1024 * 1024 },
});

const userStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = `./ProfilePics`;
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

const dpUpload = multer({ storage: userStorage });

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

router.post("/update_profile/:id", dpUpload.single("DP"), async (req, res) => {
  try {
    const { imgStatus, username } = req.body;
    const user = await User.findById(req.params.id);

    let newImg;

    // console.log(imgStatus);
    if (imgStatus === "yes") {
      newImg = "";
    } else if (req.file === undefined) {
      newImg = user.profilepic;
    } else {
      newImg = req.file.filename;
    }

    if (req.file != undefined || imgStatus === "yes") {
      deleteDpLocal(user.profilepic);
    }

    (user.username = username || user.username), (user.profilepic = newImg);

    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
  }
});

const deleteDpLocal = (img) => {
  const pth = `./ProfilePics`;
  fs.unlink(pth + "/" + img, (err) => {
    if (err) {
      console.log("failed to delete old local image:" + err);
    } else {
      console.log("successfully deleted old local image");
    }
  });
};

module.exports = router;
