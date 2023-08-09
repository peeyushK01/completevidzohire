import React from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Card from "react-bootstrap/Card";
import uiux from "../../assets/uiux.png";
import socialmedia from "../../assets/Social media.png";
import project from "../../assets/Project.png";
import ux from "../../assets/Ux.png";
import Application from "../../assets/Application.png"
import "../../style/Style.css";

const Jobstype = () => {
  return (
    <div>
      <section className="jobs_cards_type py-5">
        <Container>
          <Row>
            <Col md={6}>
              <div className="heading_jobs_type">
                <p>
                  Perfect station for your <br />{" "}
                  <span className="secondary_text">ideal choice..</span>{" "}
                </p>
              </div>

              <div className="para_heading_types">
                <p>
                  Let us help you to explore the limitless possibilities and unlock <br /> your ideal career path on this
                  platform.  Your triumph story begins here.
                </p>
              </div>
            </Col>

            <Col md={3}>
              <div className="card_jobs_types">
                <Card>
                  <Card.Img
                    className="img_jobs_icons"
                    variant="top"
                    src={Application}
                  />
                  <Card.Body>
                    <Card.Title>
                      <div className="text_lines_para">
                        <h4> App developer </h4>
                        <p>
                          Join as a brilliant app developer and build advanced
                          apps.
                        </p>
                      </div>
                    </Card.Title>
                  </Card.Body>
                </Card>
              </div>
            </Col>

            <Col md={3}>
              <div className="card_jobs_types">
                <Card>
                  <Card.Img
                    className="img_jobs_icons"
                    variant="top"
                    src={project}
                  />
                  <Card.Body>
                    <Card.Title>
                      <div className="text_lines_para">
                        <h4>Project manager</h4>
                        <p>
                          Join as a project manager, and drive project success.
                        </p>
                      </div>
                    </Card.Title>
                  </Card.Body>
                </Card>
              </div>
            </Col>
          </Row>

          <Row className="py-4">
            <Col md={3}>
              <div className="card_jobs_types">
                <Card>
                  <Card.Img
                    className="img_jobs_icons"
                    variant="top"
                    src={socialmedia}
                  />
                  <Card.Body>
                    <Card.Title>
                      <div className="text_lines_para">
                        <h4>Digital marketing:</h4>
                        <p>
                          Join as a digital marketing expert and grow businesses
                          with strategic <br /> skills.
                        </p>
                      </div>
                    </Card.Title>
                  </Card.Body>
                </Card>
              </div>
            </Col>

            <Col md={3}>
              <div className="card_jobs_types">
                <Card>
                  <Card.Img
                    className="img_jobs_icons"
                    variant="top"
                    src={uiux}
                  />
                  <Card.Body>
                    <Card.Title>
                      <div className="text_lines_para">
                        <h4> UI/UX design</h4>
                        <p>
                          Create UI and UX of digital products, and collaborate
                          with multioperation teams.
                        </p>
                      </div>
                    </Card.Title>
                  </Card.Body>
                </Card>
              </div>
            </Col>

            <Col md={3}>
              <div className="card_jobs_types">
                <Card>
                  <Card.Img
                    className="img_jobs_icons"
                    variant="top"
                    src={ux}
                  />
                  <Card.Body>
                    <Card.Title>
                      <div className="text_lines_para">
                        <h4>Web developer</h4>
                        <p>
                          Join as a good web developer and craft an online
                          impact by making spectacular websites.
                        </p>
                      </div>
                    </Card.Title>
                  </Card.Body>
                </Card>
              </div>
            </Col>

            <Col md={3}>
              <div className="text_lines_para pt-5 text-center">
                <button className="btn more_view">More Jobs</button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Jobstype;
