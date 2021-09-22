const User = require("../models/userSchema");
const jsonwebtoken = require("jsonwebtoken");

const authentication = async (req, res, next) => {
  try {
    const token = req.body.jwt;
    const verifyToken = jsonwebtoken.verify(token, process.env.SECRET_KEY);

    const rootUser = await User.findOne({
      _id: verifyToken._id,
      "tokens.token": token,
    });

    if (!rootUser) {
      throw new Error("User not found");
    }

    req.token = token;
    req.rootUser = rootUser;
    req.userId = rootUser._id;

    next();
  } catch (error) {
    res.status(401).send("unauthorised: no token provided");
    console.log(error);
  }
};

module.exports = authentication;
