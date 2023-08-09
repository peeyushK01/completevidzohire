// const errorResponse = require('../utils/errorResponse')
// const jwt = require('jsonwebtoken')
// const User = require('../models/userModels')

// //check user is authneticated or not
// exports.isAuthenticated = async(req, res ,next) =>{
//     const{token} = req.cookies;
//     //Make sure token exists
//     if(!token){
//         return next(new errorResponse('you are not authorized',401));
//     } try {
//         // veryfy token
//         const decode = jwt.verify(token,process.env.Jwt_SECRET);
//         req.user =await User.findById(decode.id);
//         next();
//     } catch (error) {
//         return next(new errorResponse('you are not authorized',401));
//     }
//  }
// middleware/auth.js
const jwt = require("jsonwebtoken");
const User = require("../models/userModels");
const ErrorResponse = require("../utils/errorResponse");

exports.isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorResponse("You are not authorized", 401));
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedToken || !decodedToken.id) {
      console.log("Invalid JWT token:", token);
      return next(new ErrorResponse("User ID is missing from token", 401));
    }

    const user = await User.findById(decodedToken.id);

    if (!user) {
      console.log("User not found:", decodedToken.id);
      return next(new ErrorResponse("User not found", 404));
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("JWT verification error:", error);
    return next(new ErrorResponse("You are not authorized", 401));
  }
};

exports.ispremited = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied, no token provided" });
  }
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodedToken.id);
    console.log(user);
    if (!user) {
      return res.status(401).json({ message: "Invalid token sad" });
    }
    if (user.role !== "employer") {
      return res
        .status(401)
        .json({ message: "Access denied, you are not authorized" });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token sadeqde" });
  }
};
