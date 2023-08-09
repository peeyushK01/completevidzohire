
const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const JobHistorySchema = new mongoose.Schema({
  company: {
    type: String,
  },
  position: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // This refers to the name of the User model
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job', // This refers to the name of the Job model
  },
  interviewDate: { type: String },
  applicationStatus: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
   },
  rejectionReason: { type: String }
});

const candidateSchema = new mongoose.Schema({
  cdi: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  dob: { type: String },
  about_me: { type: String },
  title: { type: String },
  gender: { type: String },
  pimage: { type: String },
  rdoc: { type: String },
  skills: { type: String },
  salary: { type: Number },
  education: { type: String },
  Experience: { type: String },
  JobHistory: [JobHistorySchema],
  Courses: { type: String },
  otherEducation: { type: String },
  selectedCountry: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Country',
  },
  selectedState: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'State',
  },
  selectedCity: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'City',
  },
});
module.exports = mongoose.model("candidate", candidateSchema);
