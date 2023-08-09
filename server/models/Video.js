//not useing this now 

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const videoSchema = new Schema({
  title: String,
  videoLink: String,
  path: String,
  contentType: String,
  
  date: { type: Date, default: Date.now },
});
const Video = mongoose.model("Video", videoSchema);

module.exports = Video;
