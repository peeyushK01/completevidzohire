import React, { useEffect, useRef, useState } from "react";
import RecordRTC from "recordrtc";
import { useNavigate } from "react-router-dom";

const Video = () => {
  const recordBtnRef = useRef(null);
  const stopBtnRef = useRef(null);
  const playBtnRef = useRef(null);
  const videoRef = useRef(null);
  const recordedVideoRef = useRef(null);
  const [recorder, setRecorder] = useState(null);
  const [mediaStream, setMediaStream] = useState(null);
  const [recordedVideoURL, setRecordedVideoURL] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const recordedVideoData = localStorage.getItem("recordedVideo");

    if (recordedVideoData) {
      setRecordedVideoURL(recordedVideoData);
      playBtnRef.current.disabled = false;
    }
  }, []);

  useEffect(() => {
    if (recorder) {
      recorder.startRecording();

      return () => {
        recorder.stopRecording();
      };
    }
  }, [recorder]);

  const handleRecord = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then((stream) => {
        setMediaStream(stream);
        setRecorder(new RecordRTC(stream, { type: "video" }));

        videoRef.current.srcObject = stream;
        playBtnRef.current.disabled = true;
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleStop = () => {
    recorder.stopRecording(() => {
      const blob = recorder.getBlob();

      const formData = new FormData();
      formData.append("video", blob, "video.mp4");

      fetch("/record-video/stop", {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            playBtnRef.current.disabled = false;
            recordedVideoRef.current.src = URL.createObjectURL(blob);

            // Save recorded video URL to localStorage
            localStorage.setItem("recordedVideo", recordedVideoRef.current.src);
          }
        })
        .catch((error) => {
          console.error(error);
        });

      // Navigate to the Newvideo component with the recorded video's path
      //  navigate(`/video/${blob.name}`);

      mediaStream.getTracks().forEach((track) => track.stop());
    });
  };

  const handlePlay = () => {
    const recordedVideo = recordedVideoRef.current;

    // Check if the recorded video has been loaded
    if (recordedVideo.readyState === 4) {
      recordedVideo.play();
    } else {
      // If the video hasn't finished loading, wait for the 'loadeddata' event
      recordedVideo.addEventListener("loadeddata", () => {
        recordedVideo.play();
      });
    }
  };

  return (
    <div>
      <h1>Online Exam Testing</h1>
      <button ref={recordBtnRef} onClick={handleRecord}>
        Record
      </button>
      <button ref={stopBtnRef} onClick={handleStop}>
        Stop
      </button>
      <button
        ref={playBtnRef}
        onClick={handlePlay}
        disabled={!recordedVideoURL}
      >
        Play
      </button>
      <br />
      <video width="320" height="240" ref={videoRef} autoPlay></video>
      <br />
      <video width="320" height="240" ref={recordedVideoRef} controls></video>
    </div>
  );
};

export default Video;
