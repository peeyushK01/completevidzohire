import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { Col, Row, Container } from "react-bootstrap";
import { FaBriefcase, FaMapMarkerAlt } from "react-icons/fa";
import jd from "../../assets/jd.png";
import { MdOutlineAssignment, MdLocationOn } from "react-icons/md";

const Jdcompany = (props) => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/get-job/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const jsonData = await response.json();
      setData(jsonData);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleApplyJob = async (id) => {
    try {
      const response = await fetch(`/api/apply-job/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: id }),
      });

      if (!response.ok) {
        throw new Error("Failed to apply for the job");
      }

      // Show success message
      console.log("Job application submitted successfully!");


      // Handle the success case here (e.g., show a success message)
    } catch (error) {
      console.log("Already Applied Jobs");
      // console.error(error);
      // Handle the error case here (e.g., show an error message)
    }

    navigate(`/question/${id}`);
  };

  return (
    <>
      <div className="Jd_company py-5">
        <section className="table_numer pt-5">
          {isLoading ? (
            <p className="error_message">Loading...</p>
          ) : data.length > 0 ? (
            <Container>
              <Row>
                {data.map((item) => {
                  return (
                    <Col md={5} className="py-3" key={item.id}>
                      <Card className="cards_data">
                        <Card.Body>
                          <Card.Text>
                            <div>
                              <div className="compnay_name">
                                <p>{item.company}</p>
                              </div>
                              <div className="position d-flex">
                                <span className="assign"><MdOutlineAssignment /></span>
                                <div>
                                  <span className="para_pa">{item.position}({item.worktype})</span>
                                </div>

                              </div>
                              <span className="location_part d-flex mt-2">
                                <span className="assign"><MdLocationOn /></span>
                                <div>
                                  <span className="para_pa">{item.workLocation}</span>
                                </div>
                              </span>{" "}
                              <br />
                              <button
                                className="Apply_btn"
                                onClick={() => handleApplyJob(item._id)}
                                disabled={isLoading}
                              >
                                Take Quiz
                              </button>
                              {/* <button className="Apply_btn1">Saved</button> */}
                            </div>
                          </Card.Text>
                        </Card.Body>
                      </Card>

                      <div className="About_jobs pt-4">
                        <div className="About_jobs pt-4">
                          <h3>About the Job</h3>
                          {item.aboutjob ? <p className="pt-2">{item.aboutjob}</p> : <p>No information available</p>}
                        </div>

                        {/* <ul>
                          <li className="pt-2">
                            Conceptualise and create intuitive, engaging, and
                            brand-consistent web experiences.
                          </li>
                          <li>
                            Continually improve and optimize user experience for
                            sites.
                          </li>
                          <li>
                            Collaborate in concept development and design
                            ideation cross-functionally to help define a
                            creative strategy.
                          </li>
                          <li>
                            Collaborating with other web development team
                            members, including developers and content creators,
                            to ensure that the website meets the client's needs.
                          </li>
                        </ul> */}

                        <div className="qualification pt-3">
                          {item.qualification && (
                            <div className="qualification pt-3">
                              <h3>Qualification</h3>
                              <ol>
                                {item.qualification.split("\n").map((qualificationItem, index) => (
                                  <li key={index}>1.{qualificationItem}</li>
                                ))}
                              </ol>
                            </div>
                          )}

                        </div>
                      </div>
                    </Col>
                  );
                })}
                <Col md={1}></Col>

                <Col md={5}>
                  <div className="jdcompnay_images">
                    <img src={jd} alt="jdcompnay_images" />
                  </div>
                </Col>
              </Row>
            </Container>
          ) : (
            <p>Data not found.</p>
          )}
        </section>
      </div>
    </>
  );
};

export default Jdcompany;