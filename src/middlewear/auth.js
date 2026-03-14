const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (!req.headers.authorization) {
    res.status(StatusCodes.UNAUTHORIZED);
    throw new Error("No Token found in header");
  }

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      let decoded = jwt.verify(token, process.env.JWT);

      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.log(error);
      res.status(StatusCodes.UNAUTHORIZED);
      throw new Error("Not authorized, token failed");
    }
  }
});

// "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5YjUwMWIxNmYzZTlkN2Y5Yzc2MzgwNiIsImlhdCI6MTc3MzQ3MDE1MiwiZXhwIjoxNzc0MzM0MTUyfQ.LjkyBmnzpHmICjqS6CmJfRzeFtl28Vo5rzbLS5VX8_w"

// [
//   "Bearer",
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5YjUwMWIxNmYzZTlkN2Y5Yzc2MzgwNiIsImlhdCI6MTc3MzQ3MDE1MiwiZXhwIjoxNzc0MzM0MTUyfQ.LjkyBmnzpHmICjqS6CmJfRzeFtl28Vo5rzbLS5VX8_w",
// ];