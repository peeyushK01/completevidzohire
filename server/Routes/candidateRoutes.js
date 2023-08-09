const express1 = require("express")
const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();
const candidateProfile = require("../controllers/candidateController.js");
const Candidate = require('../models/candidateprofile.js');
const upload = require("../middleware/upload-candidate");
const candidateController = require("../controllers/candidateController.js");
const { isAuthenticated } = require("../middleware/auth");
const {
  answerController,
  getcandijob,
  getCandidateAnswers,
  getJobApplicants,
} = require("../controllers/jobcontroller.js");


// const { uploadCandidate } = require("../middleware/uploadMiddleware");

// Route Level Middleware - For Parsing multipart/form-data
router.use(
  "/candidateProfile",
  upload.fields([
    { name: "pimage", maxCount: 1 },
    { name: "rdoc", maxCount: 1 },
  ])
);

//test

// router.post('/profile', upload.single('file'), function (req, res, next) {
//     // req.file is the `avatar` file
//     // req.body will hold the text fields, if there were any

//     res.send('file uploaded')
//   })

//user profile routes
router.post("/candidateProfile", candidateProfile.candiProfile);

//get data for prefilled
router.get('/candidates/:id', async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id); // Find candidate by ID
    console.log(candidate)
    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }

    // Return the candidate data as the response
    res.json(candidate);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});
// Route to serve the image file
router.get("/image/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, "../public/uploads/pimage", filename);

  // Check if file exists
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      console.error(err);
      return res.status(404).send({
        status: "error",
        message: "Image not found",
      });
    }

    // Read the file and send it in the response
    const fileStream = fs.createReadStream(filePath);
    res.setHeader("Content-Type", "image/jpeg"); // Set the content type of the response
    fileStream.pipe(res);
  });
});

router.get("/list", candidateProfile.profileList);

//find single candidate profile
router.get("/edit/:id", candidateProfile.findsingle);
// update candidate profile

router.put(
  "/update/:id",
  upload.fields([
    { name: "pimage", maxCount: 1 },
    { name: "rdoc", maxCount: 1 },
  ]),
  candidateController.editCandidate
);

router.post("/lookup", candidateProfile.profileList);

//api/user job history
router.post(
  "/user/jobhistory/:id",

  isAuthenticated,
  candidateProfile.createUserJobHistory
);
// testing answer
router.get("/questions/:id", getcandijob);
router.post("/answer/:id", answerController);
router.post("/applied-jobs/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const {
      company,
      position,
      salary,
      workLocation,
      jobId,
      interviewDate,
      applicationStatus,
    } = req.body;

    // Find the candidate by userId and populate the JobHistory field
    const candidate = await Candidate.findOne({ cdi: userId }) // Use findOne instead of find
    // console.log(candidate);

    if (!candidate) {
      return res.status(404).json({ error: "Candidate not found" });
    }

    // Check if the candidate has already applied for the same job
    const hasApplied = candidate.JobHistory.some(
      (job) => job.jobId === jobId
    );
console.log()
    if (hasApplied) {
      return res.status(400).json({ error: "You have already applied for this job" });
    }

    // Create a new job history entry
    const newJobHistory = {
      company,
      position,
      salary,
      workLocation,
      user: userId,
      jobId,
      interviewDate,
      applicationStatus,
    };

    // Push the new job history entry to the candidate's JobHistory array
    candidate.JobHistory.push(newJobHistory);

    // Save the candidate's updated profile
    await candidate.save();

    res.status(200).json({
      candidateId: candidate._id,
      jobHistory: candidate.JobHistory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
});
module.exports = router