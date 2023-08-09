import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Footerlogo from "../../assets/footer_support.svg";
import logo from "../../assets/logovideo.png";

const Footer = () => {
  return (
    <div className="footer_end py-5">
      <Container>
        <Row>
          <Col md={12}>
            <div className="footer_heading text-center py-4">
              <h3>
                Get Your Dreams <span className="job_here">Job Here ....</span>{" "}
              </h3>
            </div>
          </Col>
        </Row>
      </Container>
      <Container className="mt-4">
        <Row>
          <Col md={4}>
            <div className="foo_sec">
              <h3>About Company</h3>
              <ul className="pt-3">
                <li>Contact Us</li>
                <li>Terms & Condition</li>
                <li> Privacy & Policy</li>
              </ul>
            </div>
          </Col>
          <Col md={4}>
            <div className="foo_sec">
              <h3>For Candidate's</h3>

              <ul className="pt-3">
                <li>Browse Categories</li>
                <li>Save Jobs List</li>
                <li>Browse Jobs</li>
                <li>Candidate Dashboard</li>
              </ul>
            </div>
          </Col>
          <Col md={4}>
            <div className="foo_sec">
              <h3>For Employer's</h3>

              <ul className="pt-3">
                <li>Post A Job</li>
                <li>Browse Candidates</li>
                <li>Employer Dashboard</li>
              </ul>
            </div>
          </Col>
        </Row>
        <hr />

        <Row className="pt-4">
          <Col md={4}>
            <div className="one_part_foo">
              <img src={Footerlogo} alt="footer_support" />

              <div className="text_foo">
                <p>
                  Support Line :{" "}
                  <span className="Contact_numer">+099-035 7398 3465</span>{" "}
                </p>
              </div>
            </div>
          </Col>

          <Col md={2}></Col>

          <Col md={6}>
            <div className="menu_foo">
              <p>Privacy</p>
              <p>Terms of Services</p>
              <p>Our Sitemap</p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Footer;