import React, { useState } from "react";
import { useMediaRecorder } from "react-media-recorder";

const VideoRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const { startRecording, stopRecording, mediaBlobUrl } = useMediaRecorder({
    video: true,
  });

  const handleStartRecording = () => {
    setIsRecording(true);
    startRecording();
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    stopRecording();
  };

  return (
    <div>
      <video src={mediaBlobUrl} controls autoPlay />
      {!isRecording ? (
        <button onClick={handleStartRecording}>Start Recording</button>
      ) : (
        <button onClick={handleStopRecording}>Stop Recording</button>
      )}
    </div>
  );
};

export default VideoRecorder;
