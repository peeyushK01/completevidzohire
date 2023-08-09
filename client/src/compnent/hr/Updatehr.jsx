import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import HR from "../../assets/basicform.png";

const Updatehr = () => {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [worktype, setWorktype] = useState("");
  const [workLocation, setWorkLocation] = useState("");
  const [questions, setQuestions] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/api/get-job/${id}`)
      .then((result) => {
        if (!result.ok) {
          throw new Error("Failed to fetch data");
        }
        return result.json();
      })
      .then((resp) => {
        if (resp && resp.length > 0) {
          const jobData = resp[0];
          setJob(jobData);
          setCompany(jobData.company);
          setPosition(jobData.position);
          setWorktype(jobData.worktype);
          setWorkLocation(jobData.workLocation);
          setQuestions(jobData.questions);
        } else {
          throw new Error("Job not found");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const handleQuestionChange = (index, text) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[index] = { ...updatedQuestions[index], question: text };
      return updatedQuestions;
    });
  };

  const handleSubmit = () => {
    fetch(`/api/update-job/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        company,
        position,
        workLocation,
        worktype,
        questions,
      }),
    })
      .then((result) => {
        if (!result.ok) {
          throw new Error("Failed to update job");
        }
        return result.json();
      })
      .then((data) => {
        console.log(data);
        navigate("/hrdata");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <section className="">
      <Container>
        <Row>
          <Col md={12} className="py-4">
            <Breadcrumb className="heading_properties">
              <Breadcrumb.Item href="#" className="link_breadcrumb">
                Employer Dashboard
              </Breadcrumb.Item>
              <Breadcrumb.Item className="link_breadcrumb" href="#">
                Update Profile
              </Breadcrumb.Item>

            </Breadcrumb>
          </Col>
        </Row>
      </Container>

      <Container>
        <Row>
          <Col md={12}>
            <div className="candidate_head">
              <h3>
                Edit Your{" "}
                <span className="company_details">Company Details</span>{" "}
              </h3>
            </div>
          </Col>
        </Row>

        <Row>
          <Col md={6} className="pt-5">
            <Form>
              <Row>
                <Col md={6} className="py-3">
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="input_lables">Company</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Company Name"
                      className="form_basic_input"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                    />
                  </Form.Group>
                </Col>

                <Col md={6} className="py-3">
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label className="input_lables">Position</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Job Position"
                      className="form_basic_input"
                      value={position}
                      onChange={(e) => setPosition(e.target.value)}
                    />
                  </Form.Group>
                </Col>

                <Col md={6} className="py-3">
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label className="input_lables">Work Location</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Work Location"
                      className="form_basic_input"
                      value={workLocation}
                      onChange={(e) => setWorkLocation(e.target.value)}  // Check onChange handler
                    />
                  </Form.Group>
                </Col>

                <Col md={6} className="py-3">
                  <Form.Group className="mb-3" controlId="formBasicWorkType">
                    <Form.Label className="input_lables">Work Type</Form.Label>
                    <Form.Control
                      as="select"  // Use a select input for dropdown
                      className="form_basic_input"
                      value={worktype}
                      onChange={(e) => setWorktype(e.target.value)}  // Update worktype state
                    >
                      <option value="full-time">full-time</option>
                      <option value="part-time">part-time</option>
                      {/* You can add more options as needed */}
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </Col>
          <Col md={1}></Col>

          <Col md={5} className="backgroud pt-5">
            <img src={HR} alt="candidate" />
          </Col>
        </Row>

        <Row className="py-4">
          <Col md={12} className="py-3">
            <div className="heading_question">
              <h3>
                Please Add Your Five <span className="question">Questions</span>{" "}
              </h3>
            </div>
          </Col>
          {questions.map((question, index) => (
            <Col md={12} className="pt-3" key={index}>
              <Form.Group className="mb-3" controlId={`question${index + 1}`}>
                <Form.Label className="input_lables">Question {index + 1}</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={`Enter Question ${index + 1}`}
                  className="form_basic_input"
                  value={question.question}
                  onChange={(e) => handleQuestionChange(index, e.target.value)}
                />
              </Form.Group>
            </Col>
          ))}

          <Col md={12} className="pt-3">
            <section className="button_more">
              <Button className="more_view mr-4" type="button" onClick={handleSubmit}>
                Submit
              </Button>
            </section>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Updatehr;