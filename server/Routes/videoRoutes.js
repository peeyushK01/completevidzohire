const Candidate1 = require("../models/candidateprofile")
const express = require("express");
const multer = require("multer");
const fs = require("fs");
 const Candidate = require("../models/candidateprofile")
 const rangeParser = require("range-parser");

// console.log(Video)
const Job = require("../models/job");
const jwt = require("jsonwebtoken");


const upload = multer({ dest: "uploads/" });
const {
  videoStartapp,
  serveVideo,
  streamVideo,
} = require("../controllers/videoRecorder");

const job = require("../models/job");

const {createUserJobHistory,videoPlay} = require("../controllers/candidateController");

const router = express.Router();

const mongoose = require('mongoose');
const {ObjectId}= mongoose.Types

/***************start video***************/
router.get("/record-video/start", videoStartapp);
router.post("/record-video/stop/:id/:currentQuestion", upload.single("video"), async (req, res) => {
  const jobId = req.params.id;
  const questionId = req.params.currentQuestion;
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!decodedToken || !decodedToken.id) {
      console.log("Invalid JWT token:", token);
      return res.status(401).json({ error: "User not authenticated" });
    }

    const userId = decodedToken.id;
    // console.log(userId,"this is for user id")

  try {
    const job = await Job.findById(jobId);
    if (!req.file) {
      return res.status(400).send("No file uploaded");
    }

    const { title } = req.body;
    const { path, mimetype } = req.file;

    console.log(path,"check")

    const question = job.questions.id(questionId);
    // console.log(question,"t check")
    if (!question) {
      return res.status(400).send("Question not found");
    }

    question.answers.push({
      answer: path, // You may include additional properties related to the answer
      answeredBy: userId, // Assuming you have the authenticated user's ID
      video: {
        title,
        videoLink: '', // You can include a link to the video if needed
        path, // The path to the video file
        contentType: mimetype,
        date: Date.now(),
      },
    });

    await job.save();

    return res.status(200).send("Video path stored successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred while storing the video path");
  }
});

    // Create a new video document
    // const video = new Video({
    //   title,
    //   path: path, // or path: path.resolve(req.file.path) if it's a relative path
    //   contentType: mimetype,
    // });

    // Save the video document to MongoDB
    // await video.save();
    // console.log(video,"check")
    

    // Generate the URL for the recorded video data
    // const videoURL = `/videos/${video._id}`;
// console.log(videoURL)
    // res.status(201).send(videoURL);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Error uploading video");
//   }
// });
router.get("/video/:filename", streamVideo);
// router.get("/videos/:id", async (req, res) => {
//   try {
//     const id = req.params.id;
//     // console.log(id,"dsdsdksk")
//     const oneJob = await job.findOne({_id:"64a25c829469147bb61dc209"}) //job id 
//     console.log(oneJob,"dsdsdksk")
//     let foundOne =oneJob.questions[0].answers.filter((item)=>{
//       // console.log(typeof item._id.toString(),"id",typeof id )
      
//       return item._id.toString() === id 
//     })[0]
//     // .forEach((val)=>{
//     //   console.log(val.answers);
//     //   return val.answers.filter((ans)=>ans.answer == "uploads\\7a252023af3ffe87224736ba7fde0eab")
//     // })
    
//     // console.log(foundOne)
//     // Find the video document by ID
//     // const video = await Video.findById(new ObjectId(id));

//     // const video = await Video.findById(x);
//     // console.log(video)


    
//     if (!foundOne) {
//       return res.sendStatus(404);
//     }

//     // if (!video) {
//     //   return res.sendStatus(404);
//     // }

//     const path = foundOne.answer;
//     const fileSize = fs.statSync(path).size;
//     const range = req.headers.range;

//     if (range) {
//       // Range request headers exist, process the request
//       const parts = range.replace(/bytes=/, "").split("-");
//       const start = parseInt(parts[0], 10);
//       const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
//       const chunksize = end - start + 1;

//       const fileStream = fs.createReadStream(path, { start, end });
//       const head = {
//         "Content-Range": `bytes ${start}-${end}/${fileSize}`,
//         "Accept-Ranges": "bytes",
//         "Content-Length": chunksize,
//         // "Content-Type": foundOne.contentType,
//         "Content-Type": "video/mp4",
//       };

//       res.writeHead(206, head,"sussces");
//       fileStream.pipe(res);
      
//     } else {
//       // No range headers, serve the entire file
//       const head = {
//         "Content-Length": fileSize,
//         // "Content-Type": foundOne.contentType,
//         "Content-Type": "video/mp4",
//       };

//       res.writeHead(200, head);
//       // chaning response to client side
//       // res.status(200).send("Error fetching video");
//       fs.createReadStream(path).pipe(res);
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Error fetching video");
//   }
// });
//testing code 
// router.get('/videos/:jobId/:questionId/:candidateId', createUserJobHistory, async (req, res) => {
//   // Fetch the jobId, questionId, and candidateId from the request parameters
//   const { jobId, questionId, candidateId } = req.params;

//   try {
//     // Find the candidate by ID
//     const candidate = await Candidate.findById(candidateId);
    
//     // const candidate = await createUserJobHistory();
    
//     // console.log(candidate)
//     // const candidate = req.candidateData
//     console.log(candidate,"sdskdksdksdsndsndnsj");


//     if (!candidate) {
//       return res.sendStatus(404);
//     }

//     const jobToFound = candidate.jobHistory.jobId
//     // console.log(jobToFound)
//     // Find the candidate's job by ID
//     // const job = candidate.jobs.find((job) => job.job.toString() === jobId);
//     // const job = candidate.JobHistory.find((job) => job.job.toString() === jobId);

//     const job = await Job.findById(jobToFound);


//     console.log(job,"sdjskjdksjdk");

//     if (!job) {
//       return res.sendStatus(404);
//     }

//     // Find the question's answer for the candidate's job by question ID
//     const answer = job.answers.find((answer) => answer.question.toString() === questionId);

//     if (!answer) {
//       return res.sendStatus(404);
//     }

//     const path = answer.video.path;
//     const fileSize = fs.statSync(path).size;
//     const range = req.headers.range;

//     if (range) {
//       // Range request headers exist, process the request
//       const parts = range.replace(/bytes=/, "").split("-");
//       const start = parseInt(parts[0], 10);
//       const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
//       const chunksize = end - start + 1;

//       const fileStream = fs.createReadStream(path, { start, end });
//       const head = {
//         "Content-Range": `bytes ${start}-${end}/${fileSize}`,
//         "Accept-Ranges": "bytes",
//         "Content-Length": chunksize,
//         "Content-Type": "video/mp4",
//       };

//       res.writeHead(206, head);
//       fileStream.pipe(res);
//     } else {
//       // No range headers, serve the entire file
//       const head = {
//         "Content-Length": fileSize,
//         "Content-Type": "video/mp4",
//       };

//       res.writeHead(200, head);
//       fs.createReadStream(path).pipe(res);
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Error fetching video");
//   }
// });
// 



// Function to find a job by its ID within a candidate object


// router.get('/videos/:jobId/:questionId/:candidateId', createUserJobHistory, async (req, res) => {
//   // Fetch the jobId, questionId, and candidateId from the request parameters
//   const { jobId, questionId, candidateId } = req.params;

//   try {
//     const candidate = req.candidateData;
//     // console.log(candidate, "Sdsk");

//     if (!candidate) {
//       return res.sendStatus(404);
//     }

//     // Find the candidate's job by jobId
//     const job = await Job.findById("64a25aa89469147bb61dc1e8")
//     console.log(job)

 
//     // Find the question's answer for the candidate's job by questionId
//     const answer =  job.questions.find((ans) => ans._id.toString() === questionId);
  
//     // console.log(answer.answers[0].video.path ,"sdjskjdkskdjskdk");
//      // const answer = job.questions.answers.find((ans) => ans.question.toString() === questionId);

//     if (!answer || !answer.answers[0].video || !answer.answers[0].video.path) {
//       return res.sendStatus(404);
//     }

//     const path = answer.answers[0].video.path
//     const fileSize = fs.statSync(path).size;
//     const range = req.headers.range;

//     if (range) {
//       // Range request headers exist, process the request
//       const parts = rangeParser(fileSize, range);
//       if (parts === -1) {
//         return res.sendStatus(416); // Range Not Satisfiable
//       }

//       const start = parts[0].start;
//       const end = parts[0].end;
//       const chunksize = (end - start) + 1;

//       const fileStream = fs.createReadStream(path, { start, end });
//       const head = {
//         "Content-Range": `bytes ${start}-${end}/${fileSize}`,
//         "Accept-Ranges": "bytes",
//         "Content-Length": chunksize,
//         "Content-Type": "video/mp4",
//       };
      
//       // Object.entries(head).forEach(([key, value]) => {
//       //   res.setHeader(key, value); // Use setHeader() instead of writeHead()
//       // });
//        res.writeHead(206, head);
//       fileStream.pipe(res);
//     } else {
//       // No range headers, serve the entire file
//       const head = {
//         "Content-Length": fileSize,
//         "Content-Type": "video/mp4",
//       };

//       // Object.entries(head).forEach(([key, value]) => {
//       //   res.setHeader(key, value); // Use setHeader() instead of writeHead()
//       // });
//       res.writeHead(200, head);
//       const fileStream = fs.createReadStream(path);
//       fileStream.pipe(res);
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Error fetching video");
//   }
// });

//testing video route
router.get('/videos/:jobId/:candidateId/:questionId', videoPlay, async (req, res) => {
  // Fetch the jobId, questionId, and candidateId from the request parameters
  const { jobId, questionId, } = req.params;

  try {
    const candidate = req.candidateData;

    if (!candidate) {
      return res.sendStatus(404);
    }

    // Find the candidate's job by jobId
    const job = await Job.findById(jobId);
    if (!job) {
      return res.sendStatus(404);
    }
// console.log(job)
    // Find the question's answer for the candidate's job by questionId
    const answer = job.questions.find((ans) => ans._id.toString() === questionId);

    if (!answer || !answer.answers[0].video || !answer.answers[0].video.path) {
      return res.sendStatus(404);
    }

    const path = answer.answers[0].video.path;
    const fileSize = fs.statSync(path).size;
    const range = req.headers.range;

    if (range) {
      // Range request headers exist, process the request
      const parts = rangeParser(fileSize, range);
      if (parts === -1 || parts.length !== 1) {
        return res.sendStatus(416); // Range Not Satisfiable
      }

      const start = parts[0].start;
      const end = parts[0].end;
      const chunksize = (end - start) + 1;

      const fileStream = fs.createReadStream(path, { start, end });
      const head = {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunksize,
        "Content-Type": "video/mp4",
      };

      res.writeHead(206, head);
      fileStream.pipe(res);
    } else {
      // No range headers, serve the entire file
      const head = {
        "Content-Length": fileSize,
        "Content-Type": "video/mp4",
      };

      res.writeHead(200, head);
      const fileStream = fs.createReadStream(path);
      fileStream.pipe(res);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching video");
  }
});
// console.log()

 
module.exports = router;
