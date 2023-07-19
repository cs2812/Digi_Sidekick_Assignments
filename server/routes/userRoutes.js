const express = require("express");
const User = require("../models/user_model");

const userRoute = express();

userRoute.get("/", async (req, res) => {
  try {
    const userData = await User.find({});
    if (!userData) {
      return res
        .status(400)
        .send({ message: "authorization error", data: null });
    } else {
      res.status(200).send({ message: "query successfull", data: userData });
    }
  } catch (error) {
    res.status(500).send({ message: "server error", error, data: null });
  }
});

userRoute.post("/", async (req, res) => {
  try {
    const { email } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists",
        error: "Email already exists",
        data: null,
      });
    }
    const newUser = new User(req.body);
    await newUser.save();
    res.status(200).json({ message: "User Added successfully" });
  } catch (error) {
    res.status(500).json({ message: "server error", error, data: null });
  }
});

userRoute.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const newUserData = req.body;
    const existingUser = await User.findOne({ _id: id });
    if (!existingUser) {
      return res.status(400).json({ message: "user not found", data: null });
    }
    await User.updateOne({ _id: id, newUserData });
    res
      .status(200)
      .json({ message: "User updated successfully", data: newUserData });
  } catch (error) {
    res.status(500).json({ message: "server error", error, data: null });
  }
});

userRoute.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const existingUser = await User.findOne({ _id: id });
    if (!existingUser) {
      return res.status(400).json({ message: "user not found", data: null });
    }
    await User.deleteOne({ _id: id });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "server error", error, data: null });
  }
});
