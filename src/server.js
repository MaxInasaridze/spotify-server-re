const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRouter = require("./routes/userRoutes");
const connectedDB = require("./config/dbConnect.js");

//Load env variables
dotenv.config();

connectedDB();

//Initialize app
const app = express();

app.use(express.json());

app.use("/api/users", userRouter);

// Start the server
const PORT = process.env.PORT || 5000;

//Global error  
app.use((err, req, res, next) => {
  res.startus(err.startus || "Internal server error")
}); 


const startServer = async () => {
  await connectedDB(); // Ensure DB is connected before starting server 
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  })
};

startServer(); 