import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import about1 from "../../assets/about1.png"
import about2 from "../../assets/about2.png"
import about3 from "../../assets/about3.png"
import about4 from "../../assets/about4.png"
import about5 from "../../assets/about5.png"
import vidzologo from "../../assets/colorvidzo.png";
import Footer from "../../compnent/home/Footer";
import Navbars from "../../compnent/home/Navbar";
function Aboutus() {
  return (
    <>
      <Container>
        <div className="about_us_banner">
          <div className="logo_banner">
            <img src={vidzologo} alt="" />
          </div>
          <div className="heading_parts text-center">
            <h3>
              <span className="header_one_all">About  </span> Us... <br />

              <span className="para_span">"Let us help you to explore the limitless <br /> possibilities and unlock
                your ideal career path on this platform. <br/> Your triumph story begins here".</span>
            </h3>
          </div>
        </div>
      </Container>


      <div className="about_heading1">
        <Container>
          <div className="about_heading">
            <Row>
              <Col md={12}>
                <div className="about_title pt-5">
                  <h3>
                    "Discover Our Story: Unveiling the Essence of{" "}
                    <span className="second_color">vidzoHire.</span> "
                  </h3>
                </div>
              </Col>
            </Row>

          </div>
        </Container>
        <Container className="py-5">
          <Row className="mt-2">
            <Col md={5}>
              <div className="brief_about">
                <p>
                  At vidzohire, we aim to revolutionize the ways employers
                  connect with talented job seekers. Our pioneering app serves
                  as a bridge to fulfill the gaps, seamlessly linking employers
                  to potential employees with a user-friendly platform. With our
                  unique feature of incorporating video response into the hiring
                  process, we redefine traditional hiring procedures and empower
                  both job seekers and employers.
                </p>{" "}
              </div>
            </Col>
            <Col md={1}></Col>
            <Col md={5}>
              <img src={about1} className="about_img" alt="about1" />
            </Col>
          </Row>

          <Row className="mt-2">
            <Col md={5}>
              <img src={about2} className="about_img" alt="about1" />
            </Col>
            <Col md={1}></Col>
            <Col md={5}>
              <div className="brief_about">
                <p>
                  Our USP lies in the online video test, designed to unlock the
                  real potential of a job seeker. We understand that a resume
                  alone cannot fully define the skills of individuals, their
                  personalities, and their abilities for the job role. We
                  provide job seekers with an opportunity to showcase and shine
                  through short video responses.
                </p>{" "}
              </div>
            </Col>
          </Row>

          <Row className="mt-2">
            <Col md={5}>
              <div className="brief_about">
                <p>
                  vidzohire prides itself on being so user-friendly platform
                  for experienced as well as freshers, offering an intuitive
                  experience for both employers and job seekers. We believe in
                  simplicity, guaranteeing that our processes are
                  straightforward and easily navigable. Our streamlined
                  interface allows employers to view complete candidate
                  profiles, including video responses to questions, eliminating
                  the need for CVs at the initial stage of assessment.
                </p>{" "}
              </div>
            </Col>
            <Col md={1}></Col>
            <Col md={5}>
              <img src={about3} className="about_img" alt="about1" />
            </Col>
          </Row>

          <Row className="mt-2">
            <Col md={5}>
              <img src={about4} className="about_img" alt="about1" />
            </Col>
            <Col md={1}></Col>
            <Col md={5}>
              <div className="brief_about pt-5">
                <p>
                  This saves time and allows employers to make more ideal
                  decisions as per their firsthand impressions, ultimately
                  leading to better candidate shortlisting.

                  with vidzohire, employers gain access to a rich pond of
                  talented job seekers while enjoying the convenience of
                  inclusive candidate profiles.
                </p>{" "}
              </div>
            </Col>
          </Row>

          <Row className="mt-2">
            <Col md={5}>
              <div className="brief_about pt-5">
                <p>
                  Join vidzohire now and experience the future of recruitment,
                  where talent meets opportunities in an all-new and dynamic,
                  and engaging way. Explore top-notch candidates, make informed
                  choices, and embark on a new eon of recruitment success with
                  our revolutionized platform.
                </p>{" "}

                <p>
                  Our platforms facilitate
                  efficient recruitment, allowing employers to assess candidates
                  holistically and make ideal decisions. By eliminating the
                  reliance solely on resumes, we reveal the potential of job
                  seekers.
                </p>
              </div>
            </Col>
            <Col md={1}></Col>
            <Col md={5}>
              <img src={about5} className="about_img" alt="about1" />
            </Col>
          </Row>
        </Container>

        <Footer />
      </div>
    </>
  );
}

export default Aboutus;