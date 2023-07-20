const express = require("express");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const Employee = require("../models/auth_model");
const authRoute = express()

//<---------------Employee signup-------------->
authRoute.post("/signup", async (req ,res) => {
    try {
      const {employee_name, email, password } = req.body;
      const isEmployeeExist = await Employee.findOne({ email });
      if (isEmployeeExist) {
        return res.status(409).json({ message: "Email already exists" });
      }
      // encoding password
      const hashedPassword = await bcrypt.hash(password, 10);

      const newemployee = new Employee({employee_name, email, password: hashedPassword });
      await newemployee.save();
      res.status(201).json({ message: "Signup successful"});
    } catch (error) {
      console.error("Error signing up:", error);
      res.status(500).json({ message: "Internal server error",error });
    }
  });

//<---------------Employee login-------------->
authRoute.post("/login", async (req,res) => {
    try {
      const { email, password } = req.body;
      //finding user
      const user = await Employee.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
      // decoding password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
      // access token
      const accessToken = jwt.sign(
        { email: user.email },
        `ACCESS_KEY_12345`,
        {
          expiresIn: "24h",
        }
      );
      // refresh token
      const refreshToken = jwt.sign(
        { email: user.email },
        `REFRESH_KEY_12345`
      );
  
      res.json({ accessToken, refreshToken });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  module.exports = authRoute;