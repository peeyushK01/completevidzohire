import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form, FloatingLabel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Candibar from "./Candibar";
import candidateform from "../../assets/pana.png";
import { Country, State, City } from 'country-state-city';
import Selectors from '../country/Selectors';
import { FaAngleDown } from "react-icons/fa";


const Candidate = () => {
  const [job, setJob] = useState({});
  const [fullname, setFullname] = useState("");
  const [dob, setDob] = useState("");
  const [salary, setSalary] = useState("");
  const [location, setLocation] = useState("");
  const [education, setEducation] = useState("");
  const [gender, setGender] = useState("");
  const [skills, setSkills] = useState("");
  const [rdoc, setRdoc] = useState("");
  const [pimage, setPimage] = useState("");
  const [title, setTitle] = useState("");
  const [aboutme, setAboutme] = useState("");
  const [salaryError, setSalaryError] = useState("");
  const [otherEducation, setOtherEducation] = useState("");
  const [Courses, setCourses] = useState("");
  const [futureDateSelected, setFutureDateSelected] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [dobError, setDobError] = useState("");

  let countryData = Country.getAllCountries();
  const [stateData, setStateData] = useState();
  const [cityData, setCityData] = useState();

  const [country, setCountry] = useState(countryData[0]);
  const [state, setState] = useState("");
  const [city, setCity] = useState();

  // useeffect start
  useEffect(() => {
    setStateData(State.getStatesOfCountry(country?.isoCode));
  }, [country]);

  useEffect(() => {
    setCityData(City.getCitiesOfState(country?.isoCode, state?.isoCode));
  }, [state]);

  useEffect(() => {
    stateData && setState(stateData[0]);
  }, [stateData]);

  useEffect(() => {
    cityData && setCity(cityData[0]);
  }, [cityData]);
  // end

  const navigate = useNavigate();

  const candidateHandler = async () => {
    let formIsValid = true;


    if (formIsValid) {
      try {
        const cdi = localStorage.getItem("id");
        const email = localStorage.getItem("email");

        const formData = new FormData();
        formData.append("pimage", pimage);
        formData.append("rdoc", rdoc);
        formData.append("dob", dob);
        formData.append("salary", salary);
        formData.append("state", state);
        formData.append("gender", gender);
        formData.append("location", location);
        formData.append("skills", skills);
        formData.append("education", education);
        formData.append("name", fullname);
        formData.append("cdi", cdi);
        formData.append("email", email);
        formData.append("title", title);
        formData.append("about_me", aboutme);
        formData.append("Courses", Courses);
        formData.append("otherEducation", otherEducation);
        formData.append("country", country);
        formData.append("city", city);

        const response = await fetch("http://localhost:8080/api/candidateProfile", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          // console.log(data);
          navigate("/profile");
        } else {
          throw new Error("Failed to submit the form.");
        }
      } catch (error) {
        // console.log(error);
        console.error("Error submitting form:", error);
        // Handle error state or display an error message to the user
      }
    } else {
      // Show an alert message if the form is not valid
      alert("Please fill out all the required fields.");
      setSubmitted(true);
    }
  };

  const uploadFile = (e) => {
    setPimage(e.target.files[0]);
  };

  const candidateCv = (e) => {
    const file = e.target.files[0];

    if (file) {
      const fileType = file.type;
      const validFileTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];


      if (validFileTypes.includes(fileType)) {
        setRdoc(file);
      } else {
        alert("Invalid file type. Please upload a PDF or Word document.")
      }
    }
  };

  const handleSalaryChange = (e) => {
    const value = e.target.value;

    if (/^\d*$/.test(value)) {
      setSalary(value);
      setSalaryError("");
    } else {
      setSalaryError("Salary must be a number.");
    }
  };

  // check data
  const checkFutureDate = (selectedDate) => {
    const currentDate = new Date();
    const selectedDateTime = new Date(selectedDate).getTime();

    if (selectedDateTime > currentDate.getTime()) {
      setFutureDateSelected(true);
    } else {
      setFutureDateSelected(false);
    }
  };

  return (
    <section className="candidate_details">
      <Candibar />
      <Container className="py-5">
        <Row>
          <Col md={12}>
            <div className="candidate_head pt-5">
              <h3>
                Create Your <span className="job_profile">Job Profile</span>
              </h3>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={5} className="mt-4">
            <Form>
              <Row className="pt-3">
                <Col md={12}>
                  {futureDateSelected && (
                    <div className="error-popup">
                      Future dates are not allowed.
                    </div>
                  )}
                  <Form.Group className="mb-3" controlId="formBasicDob">
                    <Form.Label className="form_title">DOB*</Form.Label>
                    <Form.Control
                      type="date"
                      className={`candidate_inputs ${submitted && !dob ? "is-invalid" : ""}`}
                      placeholder="Enter DOB"
                      onChange={(e) => {
                        setDob(e.target.value);
                        checkFutureDate(e.target.value);
                      }}
                    />
                    {submitted && !dob && <div className="invalid-feedback">{dobError}</div>}
                  </Form.Group>

                </Col>
              </Row>


              <Row className="pt-5">
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicEducation">
                    <Form.Label className="form_title"> Education* </Form.Label>

                    <Form.Control
                      as="select"
                      className="candidate_inputs"
                      placeholder="Enter Education"
                      onChange={(e) => {
                        setEducation(e.target.value);
                        if (e.target.value === "Others") {
                          setSkills("");
                        }
                      }}
                    >
                      <option value="" disabled selected> Select Education </option>
                      <option value="High School">High School</option>
                      <option value="Bachelor's Degree">Bachelor's Degree</option>
                      <option value="Master's Degree">Master's Degree</option>
                      <option value="PhD">PhD</option>
                      <option value="Others">Others</option>
                    </Form.Control>
                    <span className="icon_position"><FaAngleDown className="arrow" /></span>
                  </Form.Group>
                </Col>


                {education === "Others" && (
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formBasicCustomEducation">
                      <Form.Label className="form_title">Others Education*</Form.Label>
                      <Form.Control
                        type="text"
                        className="candidate_inputs"
                        placeholder="Enter Others Education"
                        value={otherEducation}
                        onChange={(e) => setOtherEducation(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                )}

                {!["Others"].includes(education) && (
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formBasicEducation">
                      <Form.Label className="form_title">Courses*</Form.Label>
                      <Form.Control
                        type="text"
                        className="candidate_inputs"
                        placeholder="Enter Your Courses"
                        value={Courses}
                        onChange={(e) => setCourses(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                )}
              </Row>
              <Row className="pt-5">
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicGender">
                    <Form.Label className="form_title">Skills*</Form.Label>
                    <Form.Control
                      type="text"
                      className="candidate_inputs"
                      placeholder="Enter Skills"
                      onChange={(e) => {
                        setSkills(e.target.value);
                      }}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicGender">
                    <Form.Label className="form_title">Title*</Form.Label>
                    <Form.Control
                      type="text"
                      className="candidate_inputs"
                      placeholder="Enter title"
                      onChange={(e) => {
                        setTitle(e.target.value);
                      }}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </Col>
          <Col md={2} />

          <Col md={5} className="backgroud pt-2">
            <img src={candidateform} alt="candidate" />
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formBasicSalary">
              <Form.Label className="form_title">Salary*</Form.Label>
              <Form.Control
                type="text"
                className="candidate_inputs"
                placeholder="Annual Salary Example 12000000"
                value={salary}
                onChange={handleSalaryChange}
                isInvalid={!!salaryError}
              />
              <Form.Control.Feedback type="invalid">
                {salaryError}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3"
              controlId="formBasicGender"
            >
              <Form.Label className="form_title mt-4">Gender*</Form.Label>
              <div className="d-flex justify-content-between align-items-center">
                <Form.Check
                  type="radio"
                  label="Male"
                  name="gender"
                  value="Male"
                  className="gender"
                  checked={gender === "Male"}
                  onChange={(e) => setGender(e.target.value)}
                />
                <Form.Check
                  type="radio"
                  label="Female"
                  name="gender"
                  value="Female"
                  className="gender"
                  checked={gender === "Female"}
                  onChange={(e) => setGender(e.target.value)}
                />
                <Form.Check
                  type="radio"
                  label="Other"
                  name="gender"
                  value="Other"
                  className="gender"
                  checked={gender === "Other"}
                  onChange={(e) => setGender(e.target.value)}
                />
              </div>
            </Form.Group>
          </Col>
        </Row>

        <Row className="pt-4">
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formBasicCv">
              <Form.Label className="form_title">Candidate Resume*</Form.Label>
              <Form.Control
                type="file"
                className="candidate_inputs"
                accept=".pdf,.docx"
                onChange={candidateCv}
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3 p-2" controlId="formBasicImage">
              <Form.Label className="form_title">
                Candidate Image*
              </Form.Label>
              <Form.Control
                type="file"
                className="candidate_inputs"
                accept=".png, .jpg, .jpeg"
                onChange={uploadFile}
              />
            </Form.Group>
          </Col>
        </Row>

        <section className="grid  selection:text-white">
          <div className="">
            <Form.Label className="form_title">Enter your Location*</Form.Label>
            <div className="flex flex-wrap gap-3 rounded-lg">
              <div className="zindex_form">
                <Form.Label className="form_title mt-4">Country</Form.Label>
                <Selectors
                  data={countryData}
                  selected={country}
                  setSelected={setCountry}
                  onChange={(e) => setCountry(e.target.value)}
                  className="candidate_inputs"
                />
              </div>
              {state && (
                <div className="zindex_form">
                  <Form.Label className="form_title mt-4">State*</Form.Label>
                  <Selectors
                    data={stateData}
                    selected={state}
                    setSelected={setState}
                    onChange={(e) => setState(e.target.value)}
                    className="candidate_inputs"
                  />
                </div>
              )}
              {city && (
                <div className="zindex_form">
                  <Form.Label className="form_title mt-4">City</Form.Label>
                  <Selectors
                    data={cityData}
                    selected={city}
                    setSelected={setCity}
                    onChange={(e) => setCity(e.target.value)}
                    className="candidate_inputs"
                  />
                </div>
              )}
            </div>
          </div>
        </section>

        <Row className="py-5 pt-5">
          <Col md={6}>
            <Form.Label className="form_title">About Me*</Form.Label>
            <FloatingLabel controlId="floatingTextarea2" label="About Me">
              <Form.Control
                as="textarea"
                placeholder="Tell me about Yourself !!"
                style={{ height: "100px" }}
                onChange={(e) => {
                  setAboutme(e.target.value);
                }}
              />
            </FloatingLabel>
          </Col>

          <Col md={6}></Col>

          <Col md={12} className="mt-4">
            <section className="button_more">
              <Button className="more_view mr-4" onClick={candidateHandler}>
                Submit
              </Button>
            </section>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Candidate;