import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import privacy from "../../assets/privacy_second.png";
import Button from "react-bootstrap/Button";
import vidzologo from "../../assets/colorvidzo.png";

function Privacy() {
  return (
    <div className="privacy_policy py-4">
      <div className="privacy_plicy">
        <div className="logo_forget">
         <a href="/"><img src={vidzologo} alt="forget_logo" /></a> 
        </div>
      </div>
      <Container>
        <Row>
          <Col md={6}>
            <div className="heading_policy heading_big_job_portals py-3">
              <h3>
                Privacy policies are required by law get{" "}
                <span className="secondary_color1">compliant today.</span>{" "}
              </h3>

              <p>
                This information helps match candidates with ideal job
                opportunities and enables employers to make well-managed decisions.
              </p>
            </div>


          </Col>

          <Col md={1}></Col>

          <Col md={5}>
            <div className="moblie_privacy pt-3">
              <img src={privacy} alt="" />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Privacy;