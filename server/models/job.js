const mongoose = require("mongoose");

const jobschema = new mongoose.Schema(
  {
   
    company: {
      type: String,
      
    },
    position: {
      type: String,
      
    },
    status: {
      type: String,
      enum: ["pending", "reject", "interview"],
    },
    worktype: {
      type: String,
      enum: ["full-time", "part-time", "internship"],
      default: "full-time",
    },
    aboutjob: {
      type: String,
      
    },
    aboutcompany: {
      type: String,
      
    },
    qualification: {
      type: String,
     
    },
    workLocation: {
      type: String,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    applicants: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        candidate: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "candidate",
        },
      },
    ],
    
    salary: {
      type: Number,
    },

    questions: [
      {
        question: {
          type: String,
          trim: true,
        },
        answers: [
          {
            answer: {
              type: String,
              trim: true,
            },
            answeredBy: {
              type: mongoose.Types.ObjectId,
              ref: "User",
            },
            video: {
              title: String,
              videoLink: String,
              path: String, // Add a field to store the video file path
              contentType: String,
              date: { type: Date, default: Date.now },
            },
          },
        ],
      },
      {
        question: {
          type: String,
          trim: true,
        },
        answers: [
          {
            answer: {
              type: String,
              trim: true,
            },
            answeredBy: {
              type: mongoose.Types.ObjectId,
              ref: "User",
            },
            video: {
              title: String,
              videoLink: String,
              path: String, // Add a field to store the video file path
              contentType: String,
              date: { type: Date, default: Date.now },
            },
          },
        ],
      },
      {
        question: {
          type: String,
          trim: true,
        },
        answers: [
          {
            answer: {
              type: String,
              trim: true,
            },
            answeredBy: {
              type: mongoose.Types.ObjectId,
              ref: "User",
            },
            video: {
              title: String,
              videoLink: String,
              path: String, // Add a field to store the video file path
              contentType: String,
              date: { type: Date, default: Date.now },
            },
          },
        ],
      },
      {
        question: {
          type: String,
          trim: true,
        },
        answers: [
          {
            answer: {
              type: String,
              trim: true,
            },
            answeredBy: {
              type: mongoose.Types.ObjectId,
              ref: "User",
            },
            video: {
              title: String,
              videoLink: String,
              path: String, // Add a field to store the video file path
              contentType: String,
              date: { type: Date, default: Date.now },
            },
          },
        ],
      },
      {
        question: {
          type: String,
          trim: true,
        },
        answers: [
          {
            answer: {
              type: String,
              trim: true,
            },
            answeredBy: {
              type: mongoose.Types.ObjectId,
              ref: "User",
            },
            video: {
              title: String,
              videoLink: String,
              path: String, // Add a field to store the video file path
              contentType: String,
              date: { type: Date, default: Date.now },
            },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobschema);

