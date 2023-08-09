import React from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Button from "react-bootstrap/Button";
import job from "../../assets/job.png";
import research from "../../assets/Research.png";
import steps from "../../assets/onlinetest.png";
import { FaRegCircle } from "react-icons/fa";

const Step = () => {
  return (
    <div className="Process_step py-5">
      <Container>
        <Row>
          <Col md={12}>
            <div className="why_choics text-center">
              <h3>
                Steps of<span className="why_second"> online test </span>
              </h3>
            </div>

            <div className="why_para text-center pt-3">
              <p>
                Demonstrate your skills in Flash! Take our online test- 5
                questions, <br /> each for 30 seconds, via video recording.
              </p>

              <p>Good luck with your online test!</p>
            </div>
          </Col>
        </Row>

        <Row className="pt-4">
          <Col md={6}>
            <div className="images_steps">
              <img src={steps} alt="" />
            </div>
          </Col>

          <Col md={1}></Col>

          <Col md={5} className="pt-5">
            <div className="process_heading">
              <h3>
                Process of
                <span className="step_quiz"> Online test.</span>{" "}
              </h3>
            </div>

            <div className="steps_of_quiz  d-flex justify-space-between align-items-center pt-2">
              <div className="quiz_icon">
                <FaRegCircle className="cirle_blank" />
              </div>
              <div className="steps_all">
                <p>
                  Allow camera access to begin the online test, this is
                  essential for video recording.
                </p>
              </div>
            </div>

            <div className="steps_of_quiz  d-flex justify-space-between align-items-center pt-2">
              <div className="quiz_icon">
                <FaRegCircle className="cirle_blank" />
              </div>
              <div className="steps_all">
                <p>
                  You will be presented with 5 job-relevant questions, one at a
                  time, you will need to answer each in 30 seconds.
                </p>
              </div>
            </div>

            <div className="steps_of_quiz  d-flex justify-space-between align-items-center pt-2">
              <div className="quiz_icon">
                <FaRegCircle className="cirle_blank" />
              </div>

              <div className="steps_all">
                <p>
                  For each question, record a separate video response within in
                  given time limit.
                </p>
              </div>
            </div>

            <div className="steps_of_quiz  d-flex justify-space-between align-items-center pt-2">
              <div className="quiz_icon">
                <FaRegCircle className="cirle_blank" />
              </div>

              <div className="steps_all">
                <p>
                  After submitting all your videos, HR Team will carefully
                  review the answers and respond via email or call.
                </p>
              </div>
            </div>

            <div className="steps_of_quiz  d-flex justify-space-between align-items-center pt-2">
              <div className="quiz_icon">
                <FaRegCircle className="cirle_blank" />
              </div>

              <div className="steps_all">
                <p>
                  It is important to deliver your best answer within the given
                  time limit for every question.
                </p>
              </div>
            </div>

            <div className="steps_of_quiz  d-flex justify-space-between align-items-center pt-2">
              <div className="quiz_icon">
                <FaRegCircle className="cirle_blank" />
              </div>

              <div className="steps_all">
                <p>
                  Remember, no retakes are allowed, so be prepared and confident
                  for the online test.
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Step;
