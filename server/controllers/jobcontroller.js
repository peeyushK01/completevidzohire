const jobmodel = require("../models/job");
const User = require("../models/userModels")
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const moment = require("moment");
const candidateModel = require ("../models/candidateprofile")
const fs = require("fs");
const path = require("path");
exports.GetJob = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    // console.log(token)

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decodedToken)
    if (!decodedToken || !decodedToken.id) {
      console.log("Invalid JWT token:", token);
      return res.status(400).json({ error: "Invalid token" });
    }

    const userId = decodedToken.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const company = user.compname;

    res.status(200).json({ company });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve company name" });
  }
};


exports.jobcreater = async (req, res, next) => {
  const { position, questions, sanitizedSalary, worktype, status,aboutjob ,qualification,workLocation,aboutcompany} = req.body;

  if (!position || !questions) {
    return next("Please provide all fields and  questions");
  }

  const token = req.headers.authorization.split(" ")[1];
  // console.log(token)

  try {
    const decodedToken = jwt.verify(token, process.env.Jwt_SECRET);
    // console.log(decodedToken)

    if (!decodedToken || !decodedToken.id) {
      console.log("Invalid JWT token:", token);
      return next("User ID is missing from token");
    }

    const createdBy = decodedToken.id;

    const jobData = {
      company: req.user.compname, // Fetch company name from the authenticated user
      position,
      sanitizedSalary,
      worktype,
      qualification,
      aboutjob,
      status,
      workLocation,
      aboutcompany,

      questions: questions.map((question, index) => ({
        question: question,
        answer: req.body[`answer${index + 1}`],
      })),
      createdBy,
    };

    // console.log(jobData);

    const job = await jobmodel.create(jobData);
    // console.log(job);

    res.status(200).json({
      job,
    });
  } catch (error) {
    console.log("JWT verification error:", error);
    next(error);
  }
};

exports.getcandijob = async (req, res, next) => {
  const jobId = req.params.id;

  try {
    const job = await jobmodel.findById(jobId);
    // console.log(job)

    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }


    const questions = job.questions.map((question, index) => {
      return {
        _id: question._id,
        question: question.question,
        answer: "", // Placeholder for candidate's answer
      }
    });
    res.status(200).json({
      job: {
        _id: job._id,
        company: job.company,
        position: job.position,
        questions: questions,
      },
    })
  } catch (error) {
    console.log("Error:", error);
    next(error);
  }
};
//
exports.answerController = async (req, res, next) => {
  const jobId = req.params.id;
  console.log(jobId)
  const { answers } = req.body;
  const token = req.headers.authorization.split(" ")[1];

  if (!Array.isArray(answers) || answers.length === 0) {
    return res.status(400).json({ error: "Please provide answers" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedToken || !decodedToken.id) {
      console.log("Invalid JWT token:", token);
      return res.status(401).json({ error: "User not authenticated" });
    }
    const userId = decodedToken.id;
    const job = await Job.findById(jobId);
    console.log(job)
    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }
    // Update the job's questions with the submitted answers
    job.questions.forEach((question, index) => {
      if (index < answers.length) {
        question.answers.push({
          answer: answers[index],
          answeredBy: userId,
        });
      }
    });

    await job.save();

    res.status(200).json({ job, message: "Answers submitted successfully" });
  } catch (error) {
    console.log("Error:", error);
    next(error);
  }
};
// exports.answerController = async (req, res, next) => {
//   const jobId = req.params.id;
//   const { answers, submittedVideoURL } = req.body;

//   try {
//     const job = await Job.findById(jobId);

//     if (!job) {
//       return res.status(404).json({ error: "Job not found" });
//     }

//     if (!Array.isArray(answers)) {
//       return res.status(400).json({ error: "Invalid answers format" });
//     }

//     if (answers.length > job.questions.length) {
//       return res.status(400).json({ error: "Too many answers submitted" });
//     }

//     // Update the job's questions with the submitted answers and video path
//     answers.forEach((answer, index) => {
//       const question = job.questions[index];
//       console.log(question)

//       if (question) {
//         // const { video } = answer;
//         const { title, videoLink, path, contentType, date } = video;

//         const updatedAnswer = {
//           answer: answer.answer,
//           // answeredBy: req.user._id,
//           video: {
//             title,
//             videoLink,
//             path,
//             contentType,
//             date,
//           },
//         };

//         question.answers.push(updatedAnswer);
//       }
//     });

//     // Save the updated job
//     await job.save();

//     // Perform any additional actions, such as storing the submitted video URL
//     console.log("Submitted video URL:", submittedVideoURL);

//     return res.status(200).json({ message: "Answers submitted successfully" });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// };
exports.getjob = async (req, res, next) => {
  const { status, worktype, search, sort, workLocation } = req.query;
  const queryObject = {};

  if (status && status !== "all") {
    queryObject.status = status;
  }

  if (worktype && worktype !== "all") {
    queryObject.worktype = worktype;
  }

  if (search) {
    queryObject.position = { $regex: new RegExp(search, "i") };
  }

  if (workLocation) {
    queryObject.workLocation = { $regex: new RegExp(workLocation, "i") };
  }

  // Retrieve the job data with pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;
  const skip = (page - 1) * limit;

  let queryResult = jobmodel.find(queryObject);

  // Sorting
  if (sort === "latest") {
    queryResult = queryResult.sort("-createdAt");
  }

  if (sort === "oldest") {
    queryResult = queryResult.sort("createdAt");
  }

  if (sort === "a-z") {
    queryResult = queryResult.sort("position");
  }

  if (sort === "z-a") {
    queryResult = queryResult.sort("-position");
  }

  queryResult = queryResult.skip(skip).limit(limit);

  try {
    const jobs = await queryResult.exec();
    const totaljobs = await jobmodel.countDocuments(queryObject);
    const numofPage = Math.ceil(totaljobs / limit);
    // const job = await jobmodel.find({ createdBy: req.user.id });

    res.status(200).json({
      totaljobs,
      jobs,
      numofPage,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};


// ===========get job by id========
exports.getjobid = async (req, res) => {
  const { id } = req.params;
  const get_job = await jobmodel.find({ _id: id });
  console.log(get_job);
  res.status(200).json(get_job);
};
//===========hrjob=========
exports.hrjob = async (req, res, next) => {
  const jobs = await jobmodel.find({ createdBy: req.user.id });
  console.log(jobs);
  res.status(200).json({ totaljobs: jobs.length, jobs });
};

// ========== UPDATE JOB ==========

exports.updatejob = async (req, res, next) => {
  const { id } = req.params;
  const { company, position, workLocation,questions,aboutcompany,aboutjob } = req.body; // Add workLocation here
  // Validation
  if (!company || !position) {
    return next("Please provide all fields");
  }
  // Find job
  const job = await jobmodel.findOne({ _id: id });
  if (!job) {
    return next(`No jobs found with this ID ${id}`);
  }
  if (req.user.id !== job.createdBy.toString()) { // Fix the authorization check
    return next("You are not authorized");
  }
  // Prepare the update data including workLocation
  const updateData = { company, position, workLocation ,questions,aboutcompany,aboutjob}; // Include workLocation here
  const updatejob = await jobmodel.findOneAndUpdate({ _id: id }, updateData, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({ updatejob });
};


// ========== DELETE JOB ==========
exports.deletejob = async (req, res, next) => {
  const { id } = req.params;
  //find job
  const job = await jobmodel.findOne({ _id: id });
  if (!job) {
    next(`no jobs found with this ID ${id}`);
  }
  if (!job || !req.user.id === job.createdBy.toString()) {
    next("you are not authorized to delete the job");
    return;
  }
  await job.deleteOne();
  res.status(200).json({ message: "success, job deleted!" });
};

// ========== SORT JOB ==========
exports.jobStats = async (req, res) => {
  const stats = await jobmodel.aggregate([
    //search by user job
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(req.user.id),
      },
    },
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);
  //default stats
  const defaultStats = {
    pending: stats.pending || 0,
    reject: stats.reject || 0,
    interview: stats.interview || 0,
  };

  //monthly yearly stats
  let monthlyApplication = await jobmodel.aggregate([
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(req.user.id),
      },
    },
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        },
        count: {
          $sum: 1,
        },
      },
    },
  ]);
  monthlyApplication = monthlyApplication
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;
      const date = moment()
        .month(month - 1)
        .year(year)
        .format("MMM Y");
      return { date, count };
    })
    .reverse();
  res
    .status(200)
    .json({ totlaJob: stats.length, defaultStats, monthlyApplication });
};

//apply job
const Job = require("../models/job");

exports.applyJob = async (req, res, next) => {
  try {
    const jobId = req.params.id;
    const userId = req.user.id;
    console.log(userId)

    // Find the job listing by ID
    const job = await Job.findById(jobId);
    // console.log(job,"check")

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Check if the user has already applied for the job
    const isAlreadyApplied = job.applicants.includes(userId);
    if (isAlreadyApplied) {
      return res.status(400).json({ message: "Already applied for this job" });
    }

    // Add the user to the applicants array
    job.applicants.push(userId);
    await job.save();

    res.status(200).json({ message: "Job application submitted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
//job cadi details
// exports.getJobApplicants = async (req, res, next) => {
//   try {
//     const jobId = req.params.id; // Get the job ID from the request parameters

//     // Find the job by ID and populate the applicants field with user details
//     const job = await Job.findById(jobId).populate("applicants", " email name skills");
//     // console.log(job);

//     if (!job) {
//       return res.status(404).json({ message: "Job not found" });
//     }

//     // Respond with the job applicants
//     res.status(200).json({ applicants: job.applicants });
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };
// const User = require("../models/User"); // Import the User model

// Controller - getJobApplicants
// Controller - getJobApplicants
exports.getJobApplicants = async (req, res, next) => {
  try {
    const jobId = req.params.id;

    const job = await jobmodel.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const applicants = await jobmodel.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(jobId) },
      },
      {
        $lookup: {
          from: "users",
          localField: "applicants._id",
          foreignField: "_id",
          as: "applicantDetails",
        },
      },
      {
        $unwind: "$applicantDetails",
      },
      {
        $lookup: {
          from: "candidates",
          localField: "applicantDetails._id",
          foreignField: "cdi",
          as: "applicantDetails2",
        },
      },
      {
        $unwind: {
          path: "$applicantDetails2",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          _id: "$applicantDetails._id",
          email: "$applicantDetails.email",
          name: "$applicantDetails.name",
          skills: { $ifNull: ["$applicantDetails2.skills", []] },
          title: { $ifNull: ["$applicantDetails2.title", ""] },
          about_me: { $ifNull: ["$applicantDetails2.about_me", ""] },
          gender: { $ifNull: ["$applicantDetails2.gender", ""] },
          location: { $ifNull: ["$applicantDetails2.location", ""] },
          pimage: { $ifNull: ["$applicantDetails2.pimage", ""] },
          rdoc: { $ifNull: ["$applicantDetails2.rdoc", ""] },
          applicationStatus: {
            $ifNull: ["$applicantDetails2.JobHistory.applicationStatus", ""],
          },
        },
      },
    ]);
    const processedData = applicants.map((item) => {
      const imageFileName = item.pimage;
      const documentFileName = item.rdoc;

      const imageFileUrl = `http://localhost:8080/uploads/pimage/${encodeURIComponent(
        imageFileName
      )}`;
      const documentFileUrl = `http://localhost:8080/uploads/rdoc/${encodeURIComponent(
        documentFileName
      )}`;

      return {
        ...item,
        pimage: imageFileUrl,
        rdoc: documentFileUrl,
      };
    });
    // res.status(200).json({ status: "success", data: processedData });
    res.status(200).json({ applicants ,processedData});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// console.log(applicants)



//     // Fetch additional data for each applicant
//     const applicants = job.applicants.map(async (applicant) => {
//       const user = await User.findOne({ email: applicant.email });
//       // console.log(user); // Find the user by email in the User schema
//       const otherData = await OtherSchema.findOne({ cdi: user.id });
//       console.log(otherData); // Fetch additional data from the other schema using the user's ID
//       const updatedApplicant = {
//         email: applicant.email,
//         name: user.name, // Include the name field from the User schema
//         // Include other fields from the other schema
//         image: otherData.pimage,
//         education: otherData.education,
//         // Include other fields as needed
//       };
//       return updatedApplicant;
//     });
//     console.log(updatedApplicants);
//     // Wait for all applicant data to be fetched
//     const updatedApplicants = await Promise.all(applicants);

//     // Respond with the updated applicants data
//     res.status(200).json({ applicants: updatedApplicants });
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };
// const jwt = require("jsonwebtoken");

// exports.getJobApplicants = async (req, res, next) => {
//   try {
//     const jobId = req.params.id; // Get the job ID from the request parameters
//     const token = req.headers.authorization.split(" ")[1]; // Extract the token from the Authorization header

//     // Decode the token to extract relevant information (such as user ID or email)
//     const decodedToken = jwt.verify(token, process.env.JWT_SECRET); // Replace "your-secret-key" with your actual secret key used for token signing

//     // Find the job by ID and populate the applicants field with user details
//     const job = await Job.findById(jobId).populate("applicants", "email"); // Populate the email field from the User schema

//     if (!job) {
//       return res.status(404).json({ message: "Job not found" });
//     }

//     // Fetch additional data for each applicant
//     const applicants = await Promise.all(
//       job.applicants.map(async (applicant) => {
//         const user = await User.findOne({ email: applicant.email });
//         // console.log(user);
//         const otherData = await OtherSchema.find({
//           userId: decodedToken.userId,
//         });
//         console.log(otherData);
//         const updatedApplicant = {
//           email: applicant.email,
//           name: user.name,
//           pimages: otherData.map((data) => data.pimage),
//           educations: otherData.map((data) => data.education),
//         };
//         // console.log(updatedApplicant);
//         return updatedApplicant;
//       })
//     );

// Wait for all applicant data to be fetched
//   const updatedApplicants = await Promise.all(applicants);

//   // Respond with the updated applicants data
//   res.status(200).json({ applicants: updatedApplicants });

//candidate status update
exports.updateApplicationStatus = async (req, res, next) => {
  try {
    const { jobId, candidateId } = req.params;
    const { applicationStatus } = req.body;

    if (!jobId) {
      return res.status(400).json({ message: "Invalid jobId" });
    }

    if (!candidateId) {
      return res.status(400).json({ message: "Invalid candidateId" });
    }

    const job = await jobmodel.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const candidate = await candidateModel.findOne({
      cdi: candidateId,
      "JobHistory.jobId": jobId,
    });

    if (!candidate) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    const jobHistory = candidate.JobHistory.find(
      (history) => history.jobId && history.jobId.toString() === jobId
    );

    if (!jobHistory) {
      return res.status(404).json({ message: "Job history not found for this job" });
    }

    jobHistory.applicationStatus = applicationStatus;
    await candidate.save();

    res.status(200).json({ message: "Application status updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

