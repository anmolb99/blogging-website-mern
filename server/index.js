const express = require("express");
const app = express();
require("./db/conn");

app.use(express.json());

// our routes
app.use(require("./router/auth"));

app.listen(5000, () => {
  console.log("server is running");
});
