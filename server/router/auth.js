const express = require("express");
const router = express.Router();
const Blog = require("../models/blogSchema");
const User = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.get("/", (req, res) => {
  res.send("Hey! Good day :)");
});

router.post("/register", async (req, res) => {
  const { name, email, password, cpassword } = req.body;

  try {
    if (!name || !email || !password || !cpassword) {
      return res.json({ msg: "please fill the data" });
    }

    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(422).json({ msg: "Email already exist" });
    } else if (password != cpassword) {
      return res.json({ msg: "passwords dont match" });
    } else {
      const member = new User(req.body);
      const userRegister = await member.save();

      if (userRegister) {
        res.status(201).json({ msg: "user registered successfully" });
      }
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.json({ msg: "please fill the data" });
    }

    const userExist = await User.findOne({ email: email });
    if (userExist) {
      const isMatch = await bcrypt.compare(password, userExist.password);
      if (isMatch) {
        const token = await userExist.generateAuthToken();
        console.log(token);

        return res.status(201).json({ msg: "logged in successfully" });
      } else {
        return res.status(422).json({ msg: "Invalid Credentials" });
      }
    } else {
      return res.status(422).json({ msg: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error);
  }
});

// router.post("/post_blog", (req, res) => {
//   try {
//     const data = {
//       blogTitle: req.body.blogTitle,
//       blogText: req.body.blogText,
//       blogImage: req.body.blogImage,
//       blogCategory: req.body.category,
//       blogURL: req.body.blogURL,
//     };
//     const post = new Blog(data);
//     post
//       .save()
//       .then(() => {
//         res.status(201).json({
//           status: 1,
//           msg: "blog posted successfully",
//           category: req.body.category,
//         });
//       })
//       .catch((err) => {
//         res.status(400).json({
//           status: 0,
//           msg: "please try again",
//           errMsg: err,
//         });
//         console.log(err);
//       });
//   } catch (err) {
//     console.log(err);
//   }
// });

// router.get("/get_blogs", async (req, res) => {
//   await Blogs.find({})
//     .sort({ _id: -1 })
//     .limit(10)
//     .then((data) => res.json(data))
//     .catch((err) => console.log(err));
// });

module.exports = router;
