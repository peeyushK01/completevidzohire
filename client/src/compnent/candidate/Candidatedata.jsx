import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import Viewer from "./Viewer"; // import the FileViewer component
import Image from "./Image";
import Candibar from "./Candibar";
import { Container, Row, Col } from "react-bootstrap";
import avatar from "../../assets/avatar.png";
import { FaGlobe, FaMapMarkerAlt, FaEdit, FaFilePdf } from "react-icons/fa";
import candiimg from "../../assets/canidi_img.png"

const Candidatedata = () => {
  const [data, setData] = useState([]);

  const navigate = useNavigate();

  const navgationhandler = (id) => {
    navigate(`/Upcandidate/${id}`);
  };

  useEffect(() => {
    const email = localStorage.getItem("email");
    const cdi = localStorage.getItem("id");

    const payload = {
      cdi: cdi,
      email: email,
    };

    fetch("/api/lookup", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Network response was not ok.");
        }
      })
      .then((data) => {
        // console.log(data)
        setData(data.data);
      })
      .catch((error) => {
        // console.error("Error:", error);
      });
  }, []);

  return (
    <>
      <Candibar />

      <Container>
        <div className="background_images1 mt-3">
          <Container>
            <Row>
              <Col md={12}>
                <div className="pt-5 text-center profie_header">
                  <h4>""You miss 100% of the shots you do not take"".</h4>
                  <p>-Wayne Gretzky</p>
                </div>
              </Col>
            </Row>
          </Container>
        </div>

      </Container>
      <div className="mt-5 my-5">
        {data.map((item) => {
          return (
            <div key={item._id}>
              <div className="candidate_profile py-4">
                <Container>
                  <Row>
                    <Col md={4}>
                      <div className="images pt-3">
                        {item.pimage && (
                          <div className="">
                            <img src={item.pimage} className="candidate_profile" alt="Profile Image" />
                          </div>
                        )}
                        <div className="fname pt-3">
                          <p>Name: {item.name}</p>
                          <p>Designation: {item.title}</p>
                        </div>
                        <div className="View_resume mt-3 ">

                          {item.rdoc && (
                            <a
                              href={item.rdoc}
                              target="_blank"
                              rel="noopener noreferrer"

                            >
                              <strong><FaFilePdf className="pdf_cv" />View CV</strong>
                            </a>
                          )}
                        </div>
                        <hr className="black_hr" />

                        <div className="loaction_address">
                          <h3> Location</h3>
                          <div className="location d-flex pt-3">
                            <h4><FaMapMarkerAlt className="location_type" /></h4>
                            {/* <p>{item.country}</p> */}
                            <p> India</p>
                          </div>
                          <div className="location  d-flex">
                            <h4><FaMapMarkerAlt /></h4>
                            {/* <p>{item.state}</p> */}
                            <p> Rajasthan</p>
                          </div>

                          <div className="location  d-flex">
                            <h4><FaMapMarkerAlt /></h4>
                            {/* <p>{item.state}</p> */}
                            <p> Jaipur</p>
                          </div>
                        </div>
                        <hr className="black_hr" />
                        {/* end */}

                      </div>
                    </Col>


                    <Col md={8}>
                      <Row>
                        <Col md={12}>
                          <div className="candidate_headng">
                            <span className="about_me">
                              Candidate  <span className="second_color">Profile</span>{" "}
                            </span>
                            <div className="edit_parts">
                              <Button
                                className="logout_btn"
                                onClick={() => navgationhandler(item._id)}
                              >
                                <span><FaEdit label=" Edit" /></span>
                              </Button>

                            </div>
                          </div>

                        </Col>
                      </Row>

                      <Row className="mt-4">
                        <Col md={4}>
                          <div className="location1">
                            <h4>D.O.B</h4>
                            <p>{item.dob}</p>
                          </div>

                        </Col>

                        <Col md={4}>
                          <div className="location1">
                            <h4>Salary</h4>
                            <p>{item.salary}</p>
                          </div>
                        </Col>

                        <Col md={4}>
                          <div className="location1">
                            <h4>Gender</h4>
                            <p>{item.gender}</p>
                          </div>
                        </Col>
                      </Row>

                      <Row className="mt-4">
                        <Col md={4}>
                          <div className="location1">
                            <h4>Education</h4>
                            <p>{item.education}</p>
                          </div>
                        </Col>

                        {item.education === "Others" && item.otherEducation ? (
                          <Col md={4}>
                            <div className="location1">
                              <h4>Other Education</h4>
                              <p>{item.otherEducation}</p>
                            </div>
                          </Col>
                        ) : null}
                        {!["Others"].includes(item.education) && item.Courses ? (
                          <Col md={4}>
                            <div className="location1">
                              <h4>Courses</h4>
                              <p>{item.Courses}</p>
                            </div>
                          </Col>
                        ) : null}

                      </Row>
                      <hr className="black_hr" />
                      <Row>
                        <Col md={12}>
                          <div className="btn_skills">
                            <span className="about_me">
                              Candidate  <span className="second_color">Skills</span>{" "}
                            </span>
                          </div>

                          <div className="Skilss_managemnt pt-4">
                            <p className="skills1">{item.skills}</p>
                          </div>
                        </Col>
                      </Row>

                      <hr className="black_hr" />

                      <div className="About_me mt-5">
                        <h4>
                          About <span className="second_color">Me</span>{" "}
                        </h4>
                        <p>{item.about_me}</p>
                      </div>
                    </Col>
                  </Row>
                  {/* <hr className="horizontal" /> */}

                </Container>
              </div>
            </div >
          );
        })}
      </div>
    </>
  );
};

export default Candidatedata;