import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import indeximg from "../../assets/homebg.png";
import "../../style/Style.css";
import Button from "react-bootstrap/Button";

const Banner = () => {
  return (
    <section className="text_jobportals_heading1">
      <Container>
        <Row>
          <Col md={7}>
            <section className="complete_lang">
              <div className="heading_big_job_portals">
                <h3>
                  Connecting job seekers and exceptional talent on{" "}
                  <span className="secondary_color">one platform...</span>
                </h3>
              </div>
              <div className="para_parts mt-2">
                <p>
                  Expand your skills in development , testing , analysis and
                  desiging.
                </p>
              </div>
            </section>
            <section className="button_more mt-3">
             <a href="/login"> <Button className="more_view">Start Now</Button></a>
            </section>
          </Col>
          <Col md={5}>
            <div className="side_img pt-5">
              <img src={indeximg} alt="indeximg" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Banner;