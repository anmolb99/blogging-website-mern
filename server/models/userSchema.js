const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cpassword: {
    type: String,
    required: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    console.log("hua kuch");
    this.password = await bcrypt.hash(this.password, salt);
    this.cpassword = await bcrypt.hash(this.cpassword, salt);
  }
  next();
});

userSchema.methods.generateAuthToken = async function () {
  let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
  this.tokens = this.tokens.concat({ token: token });
  await this.save();
  return token;
};

const User = mongoose.model("user", userSchema);
module.exports = User;
