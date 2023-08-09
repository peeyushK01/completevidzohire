const express = require("express");
const mongoose = require("mongoose");
const app = express();
const morgan = require("morgan");
const helmet = require("helmet");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

require("dotenv").config();
var cors = require("cors");
app.use(cookieParser());
// Serve static files from the "public" directory
app.use(express.static("public"));

// importing routes
const routes = require("./Routes/auth");
const candidate = require("./Routes/candidateRoutes");
const job = require("./Routes/JobsRoutes");
const video = require("./Routes/videoRoutes");

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(xss());
app.use(mongoSanitize());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// initializing route (load Routes)
app.use("/api", routes);
app.use("/api", candidate);
app.use("/api/", job);

app.use("/", video);

// app.use('/employeer',)

//database connection

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((error) => {
    console.error(error);
  });

// Route for starting recording

// Port initialize
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
