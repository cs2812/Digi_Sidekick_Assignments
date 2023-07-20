const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoute = require("../routes/userRoutes");
const employeeRoute = require("../routes/authRoutes");
require('dotenv').config();
const app = express();

app.use(express.json());
app.use(cors());
app.use("/users", userRoute);
app.use("/auth", employeeRoute);

app.get("/", (req, res) => {
  res.send("Har Har Mahadev");
});

async function Connect_to_DB() {
  try {
    await mongoose.connect(
      `${process.env.MONGODB_LINK}`
    );
    console.log("Connected to mongoDB");
    app.listen(8080, () => {
      console.log("server start on 8080");
    });
  } catch (error) {
    console.log("Having issue while connecting to mongoDB");
  }
}

Connect_to_DB();
