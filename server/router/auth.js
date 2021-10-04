const express = require("express");
const router = express.Router();
const Blog = require("../models/blogSchema");
const User = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const authentication = require("../middleware/authentication");

router.get("/", (req, res) => {
  res.send("Hey! Good day :)");
});

router.post(`/register`, async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      return res.json({ msg: "please fill the data" });
    }

    const emailExist = await User.findOne({ email: email });
    const usernameExist = await User.findOne({ username: username });

    if (emailExist) {
      return res.status(422).json({ msg: "Email already exist" });
    } else if (usernameExist) {
      return res.status(422).json({ msg: "username already exist" });
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
  // console.log(req.body);
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

        // console.log(token);

        return res.status(201).json({
          token: token,
          uid: userExist._id,
        });
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

router.post("/logout", async (req, res) => {
  // console.log(req.body);

  try {
    const { uid, token } = req.body;

    const rootUser = await User.findById(uid);
    // res.clearCookie("uid", "token");

    // console.log(rootUser.tokens);
    console.log(rootUser);

    rootUser.tokens = rootUser.tokens.filter((currToken) => {
      return currToken.token != token;
    });

    await rootUser.save();
    res.status(200).json({ msg: "user logout" });
  } catch (error) {
    console.log(error);
  }
});

router.post("/create_blog_page", authentication, (req, res) => {
  // console.log(req.body.jwt);
  res.send(req.rootUser);
});

module.exports = router;
