const Video = require("../models/Video.js");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const path = require("path");
const fs = require("fs");

const NodeMediaServer = require("node-media-server");
// const nms = require("../nms.js"); // Assuming you have a file named "nms.js" for your NMS implementation
// Set up NodeMediaServer instance
const nms = new NodeMediaServer({
  rtmp: {
    port: 1935,
    chunk_size: 60000,
    gop_cache: true,
    ping: 30,
    ping_timeout: 60,
  },
  http: {
    port: 8000,
    mediaroot: "./server/media",
    webroot: "./client",
    allow_origin: "*",
  },
  relay: {
    ffmpeg: "/usr/local/bin/ffmpeg",
    tasks: [
      {
        app: "live",
        mode: "push",
        edge: "rtmp://127.0.0.1:1935",
      },
    ],
  },
});

// Start NodeMediaServer
nms.run();

// Start video recording
exports.videoStartapp = async (req, res) => {
  nms.getSession("live", "live", (session) => {
    const streamPath = "live";
    const { ffmpeg } = session;
    const outputPath = `./server/media/${streamPath}.mp4`;
    console.log(outputPath)

    // Use ffmpeg to capture video and audio from the RTMP stream and save it as an MP4 file
    ffmpeg
      .input(`rtmp://127.0.0.1:1935/${streamPath}`)
      .inputOptions("-pix_fmt yuv420p")
      .output(outputPath)
      .outputOptions(
        "-c:v libx264",
        "-preset veryfast",
        "-crf 22",
        "-c:a aac",
        "-b:a 128k"
      )
      .on("end", () => {
        console.log("Recording stopped");
      })
      .run();
  });

  res.sendStatus(200);
};

// Stop video recording
// (exports.stopVideo = upload.single("video")),
//   (req, res) => {
//     const { title } = req.body;
//     const { path, mimetype } = req.file;

//     try {
//       // Create new video document
//       const video = new Video({
//         title,
//         path,
//         contentType: mimetype,
//       });

//       // Save video document to MongoDB
//       video.save();

//       res.status(201).send("Video uploaded successfully");
//     } catch (error) {
//       console.error(error);
//       res.status(500).send("Error uploading video");
//     }
//   };

// Serve video file from the server
exports.streamVideo = async (req, res) => {
  const filename = req.params.filename;
  console.log(filename)
  const path = `../uploads/${filename}`;
  console.log(path)

  fs.stat(path, (error, stats) => {
    if (error) {
      console.error(error, "isme jaa raha h ");
      res.sendStatus(404);
    } else {
      const fileSize = stats.size;
      const range = req.headers.range;

      if (range) {
        // Range request headers exist, process the request
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
        const chunksize = end - start + 1;

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
        fs.createReadStream(path).pipe(res);
      }
    }
  });
};

// Serve video data from the MongoDB database
exports.serveVideo = async (req, res) => {
  const id = req.params.id;

  try {
    const video = await Video.findById(id);

    if (!video) {
      return res.sendStatus(404);
    }

    res.set({
      "Content-Type": video.contentType,
      "Content-Length": video.length,
    });

    fs.createReadStream(video.path).pipe(res);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching video");
  }
};
