const express = require("express");
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");
const User = require("../models/userModels");

const GoogleStrategy = require("passport-google-oauth20").Strategy;

const passport = require("passport");
const router = express.Router();
const {
  signup,
  logout,
  signin,
  userProfile,
} = require("../controllers/authcontroller.js");
const { isAuthenticated } = require("../middleware/auth.js");

//signup route (api/signup)
router.post("/signup", signup);
//signin route (api/signin)
router.post("/signin", signin);
//signin route (api/signin)
router.get("/logout", logout);
// Route for handling forgot password

// ...

router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    const userData = await User.findOne({ email });

    if (userData) {
      const resetToken = randomstring.generate();
      userData.token = resetToken;
      await userData.save();
      console.log(resetToken);

      sendResetPasswordMail(userData.name, userData.email, resetToken);

      res.status(200).send({ success: true, msg: "Please check your email" });
    } else {
      res.status(200).send({ success: true, msg: "This email does not exist" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ success: false, msg: error.message });
  }
});

// Route for handling password reset
router.post("/reset-password/:resetToken", async (req, res) => {
  const { resetToken } = req.params;
  const { password } = req.body;
  console.log(resetToken);
  console.log(password);

  try {
    const user = await User.findOne({ token: resetToken });
    console.log(user);

    if (!user) {
      return res
        .status(400)
        .send({ success: false, msg: "Invalid reset token" });
    }

    // Set the new password
    user.password = password;
    user.resetPasswordToken = undefined;
    await user.save();
    console.log(user.password);

    // Send a response indicating the success of the password reset
    res.status(200).send({ success: true, msg: "Password reset successful" });
  } catch (error) {
    res.status(500).send({ success: false, msg: "Internal server error" });
  }
});

// Function to send reset password email
const sendResetPasswordMail = async (name, email, token) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: "testing.krytons@gmail.com", // Replace with your email
        pass: "izbvutlktigmymaf", // Replace with your password
      },
    });

    // const mailOptions = {
    //   from: "testing.krytons@gmail.com", // Replace with your email
    //   to: email,
    //   subject: "Reset Password",
    //   html: `<p>Hi ${name}, please click <a href="http://localhost:8080/api/reset-password/${token}">here</a> to reset your password</p>`,
    // };
    const mailOptions = {
      from: "testing.krytons@gmail.com", // Replace with your email
      to: email,
      subject: "Reset Password",
      html: `
      <p>
      Dear user,
      Hi ${name}, We received a request to reset your password for your application account. <br />
      To ensure the security of your account, please follow the steps below:
    </p>
    <p>
      <strong>Step 1:</strong> Click the "Reset Password" button below to access the password reset page. <br />
      <strong>Step 2:</strong> Enter your new password and confirm it. <br />
      <strong>Step 3:</strong> Save the changes.
    </p>
    <p>
      If you didn’t initiate this request, please disregard this email. Your account remains secure, and
      no action is needed. For any further assistance, please do not hesitate to contact our
      customer support service.
      Thank you for using your application.
    </p>

    
      <a href="http://localhost:3000/newpass/${token}" style="background-color: #4CAF50; color: white; padding: 10px 20px; border: none; cursor: pointer; border-radius: 4px;">
        Reset Password
      </a>
    
      `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Mail has been sent", info.response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};
// passport.use(
//   new GoogleStrategy({
//     clientID: "YOUR_GOOGLE_CLIENT_ID",
//     clientSecret: "YOUR_GOOGLE_CLIENT_SECRET",
//     callbackURL: "/google/callback",
//   } (accessToken, refreshToken, profile, done) => {
//     // Handle the user authentication logic here
//     // ...
//   })
// );

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect or respond with data
    res.redirect("/profile");
  }
);
//testing forgot password
// send email Link For reset Password

module.exports = router;
