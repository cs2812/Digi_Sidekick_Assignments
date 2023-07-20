const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")
const userRoute = require("../routes/userRoutes");
const employeeRoute = require("../routes/authRoutes");

const app = express();

app.use(express.json());
app.use(cors())
app.use("/users",userRoute)
app.use("/auth",employeeRoute)

app.get("/", (req, res) => {
  res.send("Har Har Mahadev");
});

async function Connect_to_DB() {
  try {
    await mongoose.connect(`mongodb+srv://chetan:12345@cluster0.4jf6kcr.mongodb.net/digisidekick?retryWrites=true&w=majority`);
    console.log("Connected to mongoDB");
  } catch (error) {
    console.log("Having issue while connecting to mongoDB");
  }
}

app.listen(8080, () => {
  console.log("server start on 8080");
  Connect_to_DB();
});
