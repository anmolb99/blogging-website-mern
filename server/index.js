const express = require("express");
const app = express();
require("./conn");
const blogs = require("./models/blogs");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hey! Good day :)");
});

app.post("/post_blog", (req, res) => {
  try {
    const data = {
      blogTitle: req.body.blogTitle,
      blogText: req.body.blogText,
      blogImage: req.body.blogImage,
      blogCategory: req.body.category,
      blogURL: req.body.blogURL,
    };
    const blog = new blogs(data);
    blog
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

app.get("/get_blogs", async (req, res) => {
  await blogs
    .find({})
    .sort({ _id: -1 })
    .limit(10)
    .then((data) => res.json(data))
    .catch((err) => console.log(err));
});

app.listen(5000, () => {
  console.log("server is running");
});
