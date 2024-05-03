const { Router } = require("express");
const bcrypt = require("bcrypt");
const userModel = require("../model/userModel");
const userRouter = Router();
const jwt = require("jsonwebtoken");
userRouter.post("/register", async (req, res) => {
  const { username, password, email } = req.body;
  console.log(req.body);
  try {
    bcrypt.hash(password, 12, async (err, hash) => {
      if (err) {
        res.status(500).json({
          message: "error while hashing the password",
        });
      }
      console.log(hash);
      const user = new userModel({ username, email, password: hash });
      await user.save();
      res.status(200).send("user registered successfully");
    });
  } catch (error) {
    res.status(500).json({
      message: "Error while registering the user",
      error,
    });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });

    if (user) {
      bcrypt.compare(password, user.password, function (err, result) {
        if (result) {
          const token = jwt.sign(
            { userId: user._id, user: user.username },
            "masai"
          );
          res.status(200).json({
            message: "user logged in successfully",
            token,
          });
        } else {
          res.status(401).json({ message: "wrong password" });
        }
      });
    } else {
      res.status(404).json({
        message: "User not found, please register first",
      });
    }
  } catch (error) {}
});

module.exports = userRouter;
