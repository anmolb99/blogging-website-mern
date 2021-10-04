const express = require("express");
const app = express();
require("./db/conn");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/BlogImages"));
app.use(express.static(__dirname + "/ProfilePics"));

// our routes
app.use(require("./router/auth"));
app.use(require("./router/postHandling"));
app.use(require("./router/userhandling"));

app.listen(5000, () => {
  console.log("server is running");
});
