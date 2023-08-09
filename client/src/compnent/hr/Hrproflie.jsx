import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate } from "react-router-dom";
import HR from "../../assets/basicform.png";
import "../../style/Style.css";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Hrproflie = () => {
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [workLocation, setWorkLocation] = useState("");
  const [worktype, setWorktype] = useState("");
  const [questions, setQuestions] = useState(["", "", "", "", ""]);
  const [errorMessage, setErrorMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [qualification, setQualification] = useState("");
  const [aboutjob, setAboutjob] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = value;
    setQuestions(updatedQuestions);
  };

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await fetch("/api/company", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Error fetching company data");
        }

        const data = await response.json();
        setCompany(data.company);
      } catch (error) {
        console.error("Company data fetch error:", error.message);
        setErrorMessage("Error fetching company data");
      }
    };

    fetchCompany();
  }, [token]);

  const HRhandler = async (e) => {
    e.preventDefault();

    if (!company || !position || questions.some((q) => !q)) {
      setErrorMessage("Please provide all fields and questions");
      return;
    }

    const filteredQuestions = questions.filter((q) => q !== "");
    if (filteredQuestions.length < 2 || filteredQuestions.length > 5) {
      setErrorMessage("Please provide 2 to 5 questions");
      return;
    }

    try {
      const requestBody = {
        company,
        position,
        workLocation,
        worktype,
        aboutjob,
        qualification,
        questions: filteredQuestions,
      };

      const response = await fetch("/api/create-job", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });
      console.log(response);

      if (!response.ok) {
        throw new Error("Error creating job");
      }

      setCompany("");
      setPosition("");
      setWorkLocation("");
      setWorktype("");
      setQuestions(["", "", "", "", ""]);
      setErrorMessage("");
      toast.success("Job created successfully!");
      navigate("/hrdata");
    } catch (error) {
      console.error("Job creation error:", error.message);
      setErrorMessage("Error creating job");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <section className="HrProfile py-5">
      <ToastContainer position="top-center" />
      <Container>
        <Row>
          <Col md={12}>
            <Breadcrumb className="heading_properties">
              <Breadcrumb.Item href="#" className="link_breadcrumb">
                Employer Dashboard
              </Breadcrumb.Item>
              <Breadcrumb.Item className="link_breadcrumb" href="#">
                Create Profile
              </Breadcrumb.Item>
              <Breadcrumb.Item className="link_breadcrumb" active>
                New Jobs
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
                Add Your{" "}
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
                  <Form.Group className="mb-3" controlId="companyName">
                    <Form.Label className="input_lables">Company Name</Form.Label>
                    <Form.Control
                      type="text"
                      className="form_basic_input"
                      placeholder="Enter Company Name"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                    />
                  </Form.Group>
                </Col>

                <Col md={6} className="py-3">
                  <Form.Group className="mb-3" controlId="position">
                    <Form.Label className="input_lables">Position*</Form.Label>
                    <Form.Control
                      type="text"
                      className="form_basic_input"
                      placeholder="Job Position"
                      onChange={(e) => setPosition(e.target.value)}
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3" controlId="workLocation">
                    <Form.Label className="input_lables">
                      Work Location*
                    </Form.Label>
                    <Form.Control
                      type="text"
                      className="form_basic_input"
                      placeholder="Enter Work Location"
                      onChange={(e) => {
                        setWorkLocation(e.target.value);
                      }}
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="mb-3" controlId="workType">
                    <Form.Label className="input_lables">Work Type*</Form.Label>
                    <Form.Control
                      as="select"
                      className="form_basic_input"
                      onChange={(e) => {
                        setWorktype(e.target.value);
                      }}
                    >
                      <option value="">Select Work Type</option>
                      <option value="full-time">Full-Time</option>
                      <option value="part-time">Part-Time</option>
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

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="workLocation">
              <Form.Label className="input_lables">
                Qualification*
              </Form.Label>
              <Form.Control
                as="textarea"  // Change to textarea input
                className="form_basic_input"
                placeholder="Enter job qualification"
                onChange={(e) => {
                  setQualification(e.target.value);
                }}
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3" controlId="aboutCompany">
              <Form.Label className="input_lables">
                About the company*
              </Form.Label>
              <Form.Control
                as="textarea"  // Change to textarea input
                className="form_basic_input"
                placeholder="Enter information about the company"
                onChange={(e) => {
                  setAboutjob(e.target.value);
                }}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={12} className="py-3">
            <div className="heading_question">
              <h3>
                Please Add Your Five <span className="question">Question*</span>{" "}
              </h3>
            </div>
          </Col>
          <Col md={12} className="pt-3">
            {questions.map((question, index) => (
              <Form.Group key={index} className="mb-3" controlId={`question-${index}`}>
                <div>
                  <Form.Label className="input_lables">
                    Question {index + 1}
                  </Form.Label>
                  <Form.Control
                    type="text"
                    className="form_basic_input"
                    placeholder="Enter the Exam Question"
                    value={question}
                    onChange={(e) =>
                      handleQuestionChange(index, e.target.value)
                    }
                  />
                </div>
              </Form.Group>
            ))}
          </Col>
          <section className="button_more">
            <Button
              variant="primary"
              className="more_view mr-4"
              type="button"
              onClick={HRhandler}
            >
              Submit
            </Button>
          </section>
        </Row>
      </Container>
    </section>
  );
};

export default Hrproflie;