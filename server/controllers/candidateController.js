const upload = require("../middleware/upload-candidate.js"); 
const user = require("../models/userModels.js");
const candidateprofile =require("../models/candidateprofile"); // replace with your own candidateProfile module
// replace with the path to your own Multer middleware file
const ErrorResponse = require("../utils/errorResponse.js");
const Job = require("../models/job.js")
const mongoose = require("mongoose");
const {ObjectId} = mongoose.Types ;
const Country = require('country-state-city').Country;
const State = require('country-state-city').State;
const City = require('country-state-city').City;

exports.candiProfile = async (req, res) => {
  try {
    const {
      dob,
      gender,
      skills,
      salary,
      education,
      cdi,
      name,
      email,
      title,
      about_me,
      Experience,
      Courses,
      otherEducation,
      selectedCountryId,
      selectedStateName,
      selectedCityName
    } = req.body;

    const pimage = req.files["pimage"][0].filename;
    const rdoc = req.files["rdoc"][0].filename;

    // Checking if user with the given email exists
    const existingUser = await user.findOne({ email });
    if (!existingUser) {
      return res.status(404).send({
        status: "error",
        message: "User does not exist",
      });
    }

    // Taking object id to compare with cdi of the candidate
    const uid = existingUser._id;

    // Finding if a profile with the above email already exists
    const profileExist = await candidateprofile.findOne({ cdi: uid });

    // If profile exists
    if (profileExist) {
      res.send("Profile already created");
    } else {
      // If profile does not exist, create a new candidate profile with the cdi same as the id coming from email
      const doc = await candidateprofile.create({
        dob: dob,
        cdi: uid,
        gender: gender,
        skills: skills,
        salary: salary,
        pimage: pimage,
        rdoc: rdoc,
        education: education,
        name: name,
        title: title,
        about_me: about_me,
        Experience: Experience,
        otherEducation: otherEducation,
        Courses: Courses,
        country: selectedCountryId,
        state: selectedStateName,
        city: selectedCityName
      });

      const candidate = await doc.save();
      console.log(candidate);

      res.status(201).send({
        status: "success",
        message: "Profile uploaded successfully",
        candidate: candidate,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "error",
      message: "Unable to upload candidate profile",
    });
  }
};
exports.profileList = async (req, res) => {
  try {
    const cdi = req.body.cdi;
    const email = req.body.email;

    console.log("cdi:", cdi);
    console.log("email:", email);

    const userExists = await user.findOne({ email });
    if (!userExists) {
      return res.status(404).json({
        status: "error",
        message: "User not found. Please create an account first",
      });
    }

    const userData = await candidateprofile.aggregate([
      {
        $match: { cdi: new mongoose.Types.ObjectId(cdi) }, // Convert the cdi to ObjectId
      },
      {
        $lookup: {
          from: "users",
          localField: "cdi", // Update this field to match the cdi field in candidateProfile collection
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: {
          path: "$user",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $match: { "user.email": email },
      },
      {
        $project: {
          _id: 1,
          dob: 1,
          skills: 1,
          salary: 1,
          email: "$user.email",
          state: 1,
          gender: 1,
          location: 1,
          pimage: 1,
          rdoc: 1,
          education: 1,
          title: 1,
          about_me: 1,
          Experience: 1,
          name: "$user.name",
          role: "$user.role",
          Courses: 1,
          otherEducation: 1,
        },
      },
    ]);

    console.log("userData:", userData);

    if (!userData || userData.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "User profile not found",
        data: userData,
      });
    }

    // Process the userData to construct the full URLs for image and document
    const processedData = userData.map((item) => {
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

    res.status(200).json({ status: "success", data: processedData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", message: err.message });
  }
};

exports.findsingle = async (req, res) => {
  try {
    const singlecandi = await candidateProfile.findById(req.params.id);
    res.json(singlecandi);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
};

// exports.editCandidate = async (req, res) => {
//   try {
//     const editCandi = await candidateProfile.findByIdAndUpdate(
//       { _id: req.params.id },
//       {
//         $set: req.body,
//       },
//       { new: true }
//     );

//     console.log(editCandi);

//     res.status(201).send({
//       status: "success",
//       message: "Profile updated successfully",
//       editCandi: editCandi,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({ error: error.message });
//   }
// };
exports.editCandidate = async (req, res) => {
  try {
    const candidate = await candidateprofile.findById(req.params.id);

    if (!candidate) {
      return res.status(404).send({ error: "Candidate not found" });
    }

    // Update fields from req.body
    if (req.body.name) {
      candidate.name = req.body.name;
    }
    if (req.body.email) {
      candidate.email = req.body.email;
    }
    if (req.body.phone) {
      candidate.phone = req.body.phone;
    }
    if (req.body.dob) {
      candidate.dob = req.body.dob;
    }
    if (req.body.state) {
      candidate.state = req.body.state;
    }
    if (req.body.gender) {
      candidate.gender = req.body.gender;
    }
    if (req.body.location) {
      candidate.location = req.body.location;
    }
    if (req.body.skills) {
      candidate.skills = req.body.skills;
    }
    if (req.body.salary) {
      candidate.salary = req.body.salary;
    }
    if (req.body.education) {
      candidate.education = req.body.education;
    }
    if (req.body.title) {
      candidate.title = req.body.title;
    }
    if (req.body.about_me) {
      candidate.about_me = req.body.about_me;
    }
    if (req.body.Courses) { // Corrected field name
      candidate.Courses = req.body.Courses;
    }
    if (req.body.otherEducation) { // Corrected field name
      candidate.otherEducation = req.body.otherEducation;
    }

    if (req.files) {
      if (req.files.pimage) {
        candidate.pimage = req.files.pimage[0].filename;
      }
      if (req.files.rdoc) {
        candidate.rdoc = req.files.rdoc[0].filename;
      }
      if (req.files.rdoc) {
        candidate.rdoc = req.files.rdoc[0].filename;
      }
    }

    const updatedCandidate = await candidate.save();
    console.log(updatedCandidate);

    res.status(200).send({
      status: "success",
      message: "Profile updated successfully",
      updatedCandidate: updatedCandidate,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
};


//job history
// const candidate = require("../models/candidateprofile.js");

// exports.createUserJobHistory = async (req, res, next) => {
//   const { company, position, salary, workLocation, videoFilePath, questionIndex } = req.body;
//   try {
//     // const currentCandidate = await candidateProfile.findOne({ _id: req.user._id });
//     const currentCandidate = await candidateProfile.findOne({cdi:new ObjectId(req.params.candidateId)})

    
//     console.log(currentCandidate,"",typeof(req.params.candidateId))

//     if (!currentCandidate) {
//       return next(new ErrorResponse("You must log in", 401));
//     } else {
//       if (!currentCandidate.JobHistory) {
//         currentCandidate.JobHistory = []; // Initialize JobHistory as an empty array
//       }
//       const newJobHistory = {
//         company,
//         position,
//         salary,
//         workLocation,
//         user: req.params.candidateId,
//         jobId:req.params.jobId,
//       };
//       console.log(newJobHistory);
//       currentCandidate.JobHistory.push(newJobHistory)
//       await currentCandidate.save();
// const Candidate = require("./models/candidate"); // Adjust the path based on your project structure

// exports.createUserJobHistory = async (req, res, next) => {
//   const { company, position, salary, workLocation, questionIndex } = req.body;
//   try {
//     const currentCandidate = await candidateprofile.findOne({ cdi: req.params.candidateId });

//     if (!currentCandidate) {
//       return res.status(401).json({ error: "You must log in" });
//     }

//     // Create a new JobHistory object based on the JobHistorySchema
//     const newJobHistory = {
//       company,
//       position,
//       salary,
//       workLocation,
//       user: req.params.candidateId,
//       jobId: req.params.jobId,
//       interviewDate: "", // Set interviewDate based on your requirements
//       applicationStatus: "pending", // Set applicationStatus based on your requirements
//     };

//     // Push the new JobHistory object to the candidate's JobHistory array
//     currentCandidate.JobHistory.push(newJobHistory);

//     // Save the updated candidate profile
//     await currentCandidate.save();

//     res.status(200).json({ message: "Job history created successfully" });
//   }
// };


//       if (videoFilePath && typeof questionIndex === "number") {
//         // If a video file path is provided in the request, save it to the job answers
//         const job = await Job.findOne({ _id: req.params.jobId });
//         if (!job) {
//           return next(new ErrorResponse("Job not found", 404));
//         }

//         if (questionIndex >= job.questions.length || questionIndex < 0) {
//           return next(new ErrorResponse("Invalid question index", 400));
//         }

//         const newAnswer = {
//           answer: "Answer text or description", // Replace with the actual answer
//           answeredBy: req.user._id,
//           video: {
//             path: videoFilePath, // Set the video file path here
//             contentType: "video/mp4", // Update with the correct content type if needed
//           },
//         };

//         job.questions[questionIndex].answers.push(newAnswer);
//         await job.save();
//       }

//       currentCandidate.JobHistory.push(newJobHistory);
//       await currentCandidate.save();
//       res.status(200).json({
//         success: true,
//         jobHistory: newJobHistory,
//       });
//       req.candidateData = currentCandidate
//       next()
//     }
//   } catch (error) {
//     return next(error);
//   }
// };


exports.videoPlay = async (req, res, next) => {
  const { company, position, salary, workLocation, questionIndex, videoFilePath } = req.body;
  // console.log(req.body,"Sdss")

  console.log(req.params)
  const {candidateId } = req.params;
  try {
    // const currentCandidate = await candidateprofile.findOne({ _id: new mongoose.Types.ObjectId(req.body.cdi) });
    
    const currentCandidate = await candidateprofile.find({ cdi: new ObjectId(candidateId) });
    console.log(currentCandidate);
    
    if (!currentCandidate) {
      return res.status(401).json({ error: "You must log in" });
    }
    if (videoFilePath && typeof questionIndex === "number") {
      const job = await Job.findOne({ _id: req.body.jobId });
      console.log(job,"abc")
      if (!job) {
        return next(new ErrorResponse("Job not found", 404));
      }

      if (questionIndex >= job.questions.length || questionIndex < 0) {
        return next(new ErrorResponse("Invalid question index", 400));
      }

      const newAnswer = {
        answer: "Answer text or description", // Replace with the actual answer
        answeredBy: req.user._id,
        video: {
          path: videoFilePath, // Set the video file path here
          contentType: "video/mp4", // Update with the correct content type if needed
        },
      };

      job.questions[questionIndex].answers.push(newAnswer);
      await job.save();
    }

    // Send response and move to the next middleware
  //  await  res.status(200).json({
  //     success: true,
  //     jobHistory: newJobHistory,
  //   });

  // sending data to next controller 
    req.candidateData = currentCandidate;
    
    next();
  } catch (error) {
    return next(error);
  }
};



// 


exports.createUserJobHistory = async (req, res, next) => {
  const { company, position, salary, workLocation, questionIndex, videoFilePath,applicationStatus,rejectionReason  } = req.body;
  console.log(req.body,"Sdss")

  try {
    const currentCandidate = await candidateprofile.findById(req.body.cdi);


    console.log(currentCandidate);

    if (!currentCandidate) {
      return res.status(401).json({ error: "You must log in" });
    }

    // Create a new JobHistory object based on the JobHistorySchema
    const newJobHistory = {
      company,
      position,
      salary,
      workLocation,
      user: req.body.cdi,      
      jobId: req.body.jobId,
      applicationStatus: applicationStatus || "pending", // Use the provided applicationStatus or default to "pending"
      rejectionReason: rejectionReason || "" // Set applicationStatus based on your requirements
    };

    // Push the new JobHistory object to the candidate's JobHistory array
    currentCandidate.JobHistory.push(newJobHistory);
    console.log(newJobHistory);

    // Save the updated candidate profile
    await currentCandidate.save();

    // Handling the video file and job answers (optional, based on your requirements)
    if (videoFilePath && typeof questionIndex === "number") {
      const job = await Job.findOne({ _id: req.body.jobId });
      console.log(job, "abc");
      if (!job) {
        return next(new ErrorResponse("Job not found", 404));
      }

      if (questionIndex >= job.questions.length || questionIndex < 0) {
        return next(new ErrorResponse("Invalid question index", 400));
      }

      const newAnswer = {
        answer: "Answer text or description", // Replace with the actual answer
        answeredBy: req.user._id,
        video: {
          path: videoFilePath, // Set the video file path here
          contentType: "video/mp4", // Update with the correct content type if needed
        },
      };

      job.questions[questionIndex].answers.push(newAnswer);
      await job.save();
    }

    // sending data to next controller 
    req.candidateData = currentCandidate;

    next();
  } catch (error) {
    return next(error);
  }
};







