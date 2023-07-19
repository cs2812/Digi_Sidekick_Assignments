const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Har Har Mahadev");
});



async function Connect_to_DB() {
  try {
    await mongoose.connect(`${process.env.MONGODB_LINK}`);
    console.log("Connected to mongoDB");
  } catch (error) {
    console.log("Having issue while connecting to mongoDB");
  }
}

app.listen(8080, () => {
  console.log("server start on 8080");
  Connect_to_DB();
});
