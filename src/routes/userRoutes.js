const express = require("express");
const { registerUser, loginUser } = require("../controllers/userController");

const userRouter = express.Router();

// Public route
// Register User
// userRouter.post("/register", async (req, res) => {});

userRouter.post("/register", registerUser);

userRouter.post("/login", loginUser);

module.exports = userRouter;
