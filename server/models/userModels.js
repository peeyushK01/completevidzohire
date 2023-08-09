const mongoose1 = require("mongoose");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const roles = require("../utils/Roles");

const userSchema = new mongoose.Schema(
  {
    // candidate_id:{type: mongoose.Schema.Types.ObjectId, ref: 'candidate'},
    email: {
      type: String,
      trim: true,
      required: [true, "e-mail is required"],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
    },
    password: {
      type: String,
      trim: true,
      required: [true, "password is required"],
      minlength: [6, "password must have at least (6) characters"],
    },
    name: {
      type: String,
    },
    role: {
      type: String,
      enum: [roles.jobskeer, roles.employer],
    },
   token:{
    type:String,default:''
   },compname: {type: String,
  },
  },
  { timestamps: true }
);

// Generate password reset token
userSchema.methods.generateResetToken = function () {
  // Generate a unique reset token using crypto library
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Set the reset token and its expiry date
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Return the plain reset token
  return resetToken;
};

// Encrypt password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// Compare user password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Return a JWT token
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this.id, role: this.role }, process.env.JWT_SECRET, {
    expiresIn: 3600,
  });
};

module.exports = mongoose.model("User", userSchema);
