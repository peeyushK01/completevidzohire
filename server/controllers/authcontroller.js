const User = require("../models/userModels");
const ErrorResponse = require("../utils/errorResponse");
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");
//this is signup
exports.signup = async (req, res, next) => {
  const { email } = req.body;
  const userExist = await User.findOne({ email });
  if (userExist) {
    return next(new ErrorResponse("E-mail already registred", 400));
  }
  try {
    const user = await User.create(req.body);
    res.status(201).json({
      success: true,
      // token,
      user,
    });console.log(user)
  } catch (error) {
    next(error);
  }
};

exports.signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email) {
      return next(new ErrorResponse("please add an email", 403));
    }
    if (!password) {
      return next(new ErrorResponse("please add a password", 403));
    }

    //check user email
    const user = await User.findOne({ email });
    if (!user) {
      return next(new ErrorResponse("invalid credentials", 400));
    }
    //check password
    const isMatched = await user.comparePassword(password);
    if (!isMatched) {
      return next(new ErrorResponse("invalid credentials", 400));
    }

    sendTokenResponse(user, 200, res);
  } catch (error) {
    next(error);
  }
};

const sendTokenResponse = async (user, codeStatus, res) => {
  const token = await user.getJwtToken();
  res
    .status(codeStatus)
    .cookie("token", token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true })
    .json({ success: true, token, user });
};
//Logout

exports.logout = (req, res, next) => {
  res.clearCookie("token");
  res.status(200).json({
    success: true,
    message: "logged out",
  });
};
// user profile
exports.userProfile = async (req, res, next) => {
  const user = await user.findById(req.user.id).select("-password");
  res.status(200).json({
    success: true,
    user,
  });
};
// controllers/authController.js
// exports.forgotPassword = async (req, res) => {
//   try {
//     const { email } = req.body;
//     const userData = await User.findOne({ email });
//     if (userData) {
//       const randomString = randomstring.generate();
//       userData.resetPasswordToken = randomString;
//       await userData.save();
//       sendResetPasswordMail(userData.name, userData.email, randomString);
//       res.status(200).send({ success: true, msg: "Please check your email" });
//     } else {
//       res.status(200).send({ success: true, msg: "This email does not exist" });
//     }
//   } catch (error) {
//     res.status(400).send({ success: false, msg: error.message });
//   }
// };
