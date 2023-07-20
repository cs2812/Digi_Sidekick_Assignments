const express = require("express");
const User = require("../models/user_model");
const jwt = require("jsonwebtoken")
const userRoute = express();


// <------Middleware to verify access token ( JWT )--------->
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; //start with "Bearer"

  if (!token) {
    return res.status(401).json({ message: "authorization error" });
  }

  jwt.verify(token, `ACCESS_KEY_12345`, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Login again",error:"Invalid access token" });
    }
    next();
  });
};

// <----------Get user------------> 
userRoute.get("/",authenticateToken, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // default 1
    const usersPerPage = parseInt(req.query.limit) || 10; // default 10
    const sortBy = req.query.sortBy || '_id'; // default: '_id'
    const sortOrder = parseInt(req.query.sortOrder) || -1; // default asc
    const searchQuery = req.query.search || '';
    const filterBy = req.query.filterBy
    const filterQuery = req.query.filterQuery

    //sorting
    const sortOption = {}
    sortOption[sortBy] = sortOrder

    //searching
    let findQuery = {};
    if (searchQuery) {
      findQuery = { username: { $regex: searchQuery, $options: 'i' } };
    }

    //filtering
    if (filterBy) {
      if(filterBy==="age"){
        findQuery[filterBy]= +filterQuery;
      }
      else{
        findQuery[filterBy]=filterQuery
      }
    }
    
    // pagination
    const dataCount = await User.find(findQuery).count()
    const totalPages = Math.ceil(dataCount/usersPerPage)
    const skip = (page-1)*usersPerPage;

    const userData = await User.find(findQuery).sort(sortOption).skip(skip).limit(usersPerPage)
    if (!userData) {
      return res
        .status(400)
        .send({ message: "authorization error", data: null });
    } else {
      res.status(200).send({ message: "query successfull", data: userData,totalPages });
    }
  } catch (error) {
    res.status(500).send({ message: "server error", error, data: null });
  }
});

// <----------Post user------------> 
userRoute.post("/", authenticateToken, async (req, res) => {
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

// <----------Update user------------> 
userRoute.put("/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const newUserData = req.body;
    const existingUser = await User.findOne({ _id: id });
    if (!existingUser) {
      return res.status(400).json({ message: "user not found", data: null });
    }
    let result = await User.updateOne(existingUser,newUserData);
    if(!result.acknowledged){
      return res.status(400).json({ message: "user not found", data: null });
    }
    res
      .status(200)
      .json({ message: "User updated successfully", data: newUserData});
  } catch (error) {
    res.status(500).json({ message: "server error", error, data: null });
  }
});

// <----------Delete user------------> 
userRoute.delete("/:id",authenticateToken, async (req, res) => {
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

module.exports = userRoute;