import React from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Button from "react-bootstrap/Button";
import job from "../../assets/job.png";
import research from "../../assets/Research.png";
import deal from "../../assets/Deal.png";

const Whyus = () => {
  return (
    <div className="why_choics_us py-5">
      <Container>
        <Row>
          <Col md={12}>
            <div className="why_choics text-center">
              <h3>
                Why <span className="why_second"> Choose </span>Us
              </h3>
            </div>

            <div className="why_para text-center pt-3">
              <p>
                Our platform is the ultimate destination for finding ideal jobs
                and exceptional talent. <br /> Feel unparalleled satisfaction
                and success in your job search or recruitment journey for
                talent.
              </p>
            </div>
          </Col>
        </Row>

        <Row className="pt-4">
          <Col md={4}>
            <div className="card1_why">
              <img src={job} alt="job-search" />
              <h4 className="pt-4">For job seekers, search on. </h4>
              <p>
                For your ideal job click on find job  and embark <br/> your journey of
                exploration and find your ideal opportunities.
              </p>
              
            </div>
         </Col>

          <Col md={4}>
            <div className="card1_why">
              <img src={deal} alt="job-search" />
              <h4 className="pt-4">
                Get all opportunities in search results.
              </h4>
              <p>
                Dive deeper into our exhaustive search results <br/> and unveil a
                treasure trove of endless opportunities waiting to be explored.”
              </p>
             
            </div>
          </Col>
          <Col md={4}>
            <div className="card1_why">
              <img src={research} alt="job-search" />
              <h4 className="pt-4">
                Top sponsored opportunities come up on the top.
              </h4>
              <p>
                Discover exclusive sponsored opportunities meticulously curated
                to comes with the best.
              </p>
             
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Whyus;
