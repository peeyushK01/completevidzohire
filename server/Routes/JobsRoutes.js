const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middleware/auth");
const { ispremited } = require("../middleware/auth");
const {
  applyJob,
  hrjob,
  getJobApplicants,
  getjobid,
  GetJob,
} = require("../controllers/jobcontroller");

const {
  jobcreater,
  getjob,
  updatejob,
  deletejob,
  jobStats,
  updateApplicationStatus
} = require("../controllers/jobcontroller");
//rdoc
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


//ROUTES of JOB
router.post("/create-job", isAuthenticated, ispremited, jobcreater);
//get company name (test)
router.get("/company",GetJob)
//get jobs
router.get("/get-job", isAuthenticated, getjob);
router.get("/get-job/:id", isAuthenticated, getjobid);

//hr job
router.get("/hrjob", isAuthenticated, hrjob);

// update job
router.patch("/update-job/:id", isAuthenticated, updatejob);

//delete job
router.delete("/delete-job/:id", isAuthenticated, deletejob);

//job stats
router.get("/stats-job", isAuthenticated, jobStats);

//apply job
router.post("/apply-job/:id", isAuthenticated, applyJob);
// GET job applicants
router.get("/jobs/applicants/:id", getJobApplicants);

//applicant status change 
router.put(
  "/job/:jobId/:candidateId/status",
  updateApplicationStatus
);

module.exports = router;
