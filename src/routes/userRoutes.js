const express = require("express");
const { registerUser } = require("../controllers/userController");

const userRouter = express.Router();

// Public route
// Register User
// userRouter.post("/register", async (req, res) => {});

userRouter.post("/register", registerUser);

module.exports = userRouter;
