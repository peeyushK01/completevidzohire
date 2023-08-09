import React from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import cv from "../../assets/cv.png";
import interview from "../../assets/interview.png";
import online from "../../assets/online.png";
import resume from "../../assets/Resumeunique.png";
const Unique = () => {
  return (
    <div className="nique_qaulity py-4">
      <Container>
        <Row>
          <Col md={6}>
            <div className="images_jobs_hr mt-5">
              <img src={resume} alt="images_jobs" />
            </div>
          </Col>

          <Col md={1}></Col>

          <Col md={5}>
            <div className="heading_quality pt-3">
              <h5>
                Craft your incomparable <br />{" "}
                <span className="quality_name">account profile.</span>{" "}
              </h5>
            </div>

            <div className="para_quality">
              <p>
                Feature your Skills, knowledge, and desire to stand out and grab
                your dream job. Craft your professional brand now.{" "}
              </p>
            </div>

            <div className="image_flex_text d-flex justify-space-between align-items-center pt-3 ">
              <img src={cv} alt="bulidresume" />

              <div className="content_text pt-3">
                <h4>
                  Sync your curriculum{" "}
                  <span className="last_color"> vitae. </span> .
                </h4>
                <p>
                  Present your skills and experiences by uploading a <br />{" "}
                  video profile to seizure the attention of employers.
                </p>
              </div>
            </div>

            <div className="image_flex_text d-flex justify-space-between align-items-center pt-2">
              <img src={online} alt="bulidresume" />

              <div className="content_text pt-3">
                <h4>
                  Take Online <span className="last_color"> examination. </span>{" "}
                  .
                </h4>
                <p>
                  Take interactive online exam to showcase your skills,
                  knowledge and experience, find your specialty.
                </p>
              </div>
            </div>

            <div className="image_flex_text d-flex justify-space-between align-items-center pt-2">
              <img src={interview} alt="bulidresume" />

              <div className="content_text pt-3">
                <h4>
                  Take Online <span className="last_color"> Interview </span> .
                </h4>
                <p>
                Prepare for dream with expert-led interviews. Master <br/> your   strengths and skills and leave a unique impression.
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Unique;
