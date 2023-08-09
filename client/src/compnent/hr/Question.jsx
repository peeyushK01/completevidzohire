import React, { useEffect, useRef, useState } from "react";
import RecordRTC from "recordrtc";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import video1 from "../../assets/video1.png"
import { toast  } from 'react-toastify';

const Question = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [submittedVideoURL, setSubmittedVideoURL] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await fetch(`/api/questions/${id}`);
        const data = await response.json();
        console.log(data);
        setJob(data.job);
      } catch (error) {
        console.log("Error:", error);
      }
    };

    fetchJob();
  }, [id]);

  if (!job) {
    return <div>Loading...</div>;
  }

  const { company, position, questions } = job;

  const handleSubmit = () => {
    alert("Your Data is Recored and send to the Hr")

    navigate("/profile")
    
  };

  return (
    <div>
      <Container>
        <Row className="mt-4">
          <Col md={12}>
            <div className="Basic_information_title text-center">
              <h1>{company}</h1>
              <h2>{position}</h2>
            </div>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col md={12}>
            <div className="answer_question py-5">
              <h3>Answer five questions from the video</h3>
              {questions.map((question, index) => (
                <QuestionItem
                  key={index}
                  question={question}
                  setSubmittedVideoURL={setSubmittedVideoURL}
                  index={index}
                  handleSubmit={handleSubmit}
                  recordedVideoURL={localStorage.getItem(`recordedVideo${index}`)}
                />
              ))}
              <div className="recording_btn1 mt-4">
                <button onClick={handleSubmit} className="recording_btn">
                  Finished Quiz
                </button>
              </div>

            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const QuestionItem = ({ question, setSubmittedVideoURL, index, handleSubmit, recordedVideoURL }) => {
  const { id } = useParams();
  const recordBtnRef = useRef(null);
  const stopBtnRef = useRef(null);
  const videoRef = useRef(null);
  const recordedVideoRef = useRef(null);
  const [recorder, setRecorder] = useState(null);
  const [mediaStream, setMediaStream] = useState(null);
  const [toggle, setToggle] = useState(false);
  const [someVar, setSomeVar] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupVideoURL, setPopupVideoURL] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(null);

  useEffect(() => {
    const recordedVideoData = localStorage.getItem(`recordedVideo${index}`);
    console.log(recordedVideoData);
    if (recordedVideoData) {
      setToggle(true);
    }
  }, [index]);

  const handleRecord = async () => {

    // todo
    setSomeVar(true)

    try {
      console.log(question)
      setCurrentQuestion(question._id);

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
      setMediaStream(stream);
      const newRecorder = new RecordRTC(stream, { type: "video" });
      setRecorder(newRecorder);

      // Assign the media stream to the video element and start playing
      videoRef.current.srcObject = stream;
      await videoRef.current.play();

      // Disable record button and enable stop button
      recordBtnRef.current.disabled = true;
      stopBtnRef.current.disabled = false;

      // Start recording
      newRecorder.startRecording();



    } catch (error) {
      console.error(error);
    }
  };

  const handleStop = () => {

    const Token = localStorage.getItem("token");
    // console.log(Token , "Hello Token");


    console.log(recordedVideoRef, "check");
    setSomeVar(false);
    setShowPopup(true);
    if (recorder) {
      recorder.stopRecording(() => {
        const blob = recorder.getBlob();

        const formData = new FormData();
        formData.append("video", blob, "video.mp4");

        fetch(`/record-video/stop/${id}/${currentQuestion}`, {
          method: "POST",
          body: formData,
          headers: {
            "Authorization": `Bearer ${Token}`, // Use the token in the header
          },
        })
          .then((response) => {
            if (response.ok) {
              recordedVideoRef.current.src = URL.createObjectURL(blob);

              // Save recorded video URL to localStorage
              localStorage.setItem(`recordedVideo${index}`, recordedVideoRef.current.src);
            }
          })
          .catch((error) => {
            console.error(error);
          })
          .finally(() => {
            if (mediaStream) {
              mediaStream.getTracks().forEach((track) => track.stop());
            }

            // Enable record button and disable stop button
            recordBtnRef.current.disabled = false;
            stopBtnRef.current.disabled = true;
          });
      });
    }
  };



  // console.log(someVar,"check ");

  const handlePlay = () => {
    const stream = recordedVideoRef.current.captureStream();
    const mediaStream = new MediaStream(stream.getVideoTracks());
    recordedVideoRef.current.srcObject = mediaStream;

  };

  const VideoPopup = ({ onClose }) => {
    return (
      <div className="video-popup">
        <div className="video-container">
          <video width="300" height="200" ref={recordedVideoRef} controls></video>
        </div>
        <button className="close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    );
  };

  return (
    <div className="py-4">
      <Container>
        <Row>
          <Col md={4}>
            <div className="question_parts pt-4">
              <p>Q.{question.question}</p>
            </div>
          </Col>
          <Col md={4} className="pt-4">
            {
              someVar ?
                <video
                  ref={videoRef}
                  className="recorded-video camera-video"
                  width="300"
                  height="200"
                  controls
                  muted
                />
                : showPopup ?

                  <>
                    <video
                      ref={videoRef}
                      className="recorded-video camera-video"
                      width="300"
                      height="200"
                      controls
                      muted
                      style={{ display: "none" }}
                    />
                    <video width="300" height="200" ref={recordedVideoRef} controls></video>
                  </>
                  : <img src={video1} className="video1" alt="video1" />
            }

          </Col>
          <Col md={1}></Col>
          <Col md={3}>
            <div className="btn_radio mt-4">
              <button
                ref={recordBtnRef}
                className="recording_btn"
                onClick={handleRecord}
                disabled={recorder !== null}
              >
                Record
              </button>
              <button
                ref={stopBtnRef}
                className="recording_btn"
                onClick={handleStop}
                disabled={recorder === null}
              >
                Stop
              </button>
              {/* <button className="recording_btn play-btn" onClick={handlePlay}>
                Preview
              </button> */}
            </div>
          </Col>
        </Row>
      </Container>

    </div>
  );
};

export default Question;



// {showPopup && <VideoPopup onClose={() => setShowPopup(false)} />}