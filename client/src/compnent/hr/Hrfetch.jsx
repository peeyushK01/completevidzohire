import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { FaPlusCircle } from "react-icons/fa";
import { FaEye } from "react-icons/fa"

const Hrfetch = (props) => {
  const [data, setData] = useState([]);
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);

  // get API
  useEffect(() => {
    fetch("/api/hrjob")
      .then((result) => {
        if (!result.ok) {
          throw new Error("Failed to fetch data");
        }
        return result.json();
      })
      .then((resp) => {
        setData(resp.jobs);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // navigate variable to create the useNavigate
  const navigate = useNavigate();

  const addJob = () => {
    navigate("/hrprofile");
  };


  const updateJob = (id) => {
    // navigate the value on the hrdata parts
    navigate(`/updatehr/${id}`);
  };

  // start
  const viewApplicants = (id) => {
    setSelectedJobId(id);
    navigate(`/applicate/${id}`);
  };

  // const viewApplicants = (id) => {
  //   setSelectedJobId(id);
  //   navigate(`/applicate`);
  // };

  // viewaplicants

  // delete API
  const deleteJob = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this job?");
    if (confirmDelete) {
      fetch(`/api/delete-job/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((result1) => {
          if (!result1.ok) {
            throw new Error("Failed to delete job");
          }
          setData(data.filter((job) => job._id !== id));
          alert("Job deleted successfully");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <>
      <Container>
        <section className="banner_hr mt-3">
          <p className="text-center">
            Discover, evaluate, and elevate  your recruitment  <br /> process with an
            intuitive employer dashboard<br /> to get ideal candidates."
          </p>
        </section>
      </Container>


      <div className="btn_text pt-4 py-2">
        <Container>
          <Row>
            <Col md={6}>
              <div className="text_banner">
                <h3>
                  Employer <span className="dashhr">Dashboard</span>{" "}
                </h3>
              </div>
            </Col>
            <Col md={6}>
              <div className="btn_add">
                <Button
                  as="a"
                  className="ml-3 logout_btn"
                  onClick={() => addJob()}
                >

                  <div className="d-flex">
                    <span className="cirile_icon"><FaPlusCircle /></span>
                    <span >Create Jobs </span>

                  </div>


                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <section className="table_numer py-5">
        <Container >
          <Row>
            <Col md={12}>
              {data.length > 0 ? (
                <Table striped="columns" bordered hover size="lg" responsive>
                  <thead>
                    <tr className="Table_heading">
                      {/* <th>id</th> */}
                      <th>Position</th>
                      <th>Location</th>
                      <th>Type</th>
                      {/* <th>About</th>
                      <th>Qualification</th> */}

                      {data.length > 0 &&
                        data[0].questions &&
                        data[0].questions.length === 5 &&
                        data[0].questions.map((question, index) => (
                          <React.Fragment key={index}>
                            <th>Question {index + 1}</th>
                          </React.Fragment>
                        ))}
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((job) => (
                      <tr key={job._id}>
                        {/* <td>{job._id}</td> */}
                        <td>{job.position}</td>
                        <td>{job.workLocation}</td>
                        <td>{job.worktype}</td>
                        {/* <td>{job.aboutjob}</td>
                        <td>{job.qualification}</td> */}
                        {data.length > 0 &&
                          job.questions &&
                          job.questions.length === 5 &&
                          job.questions.map((question, index) => (
                            <td key={index}>{question.question} </td>
                          ))}
                        <td>
                          <span className="d-flex pt-4">
                            <FaTrashAlt
                              className="icons_hr"
                              onClick={() => deleteJob(job._id)}
                            />
                            <FaEdit
                              className="icons_hr"
                              onClick={() => updateJob(job._id)}
                            />

                            <FaEye className="icons_hr" onClick={() => viewApplicants(job._id)} />
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <p className="error_message"><strong>Wait for Data fetching..</strong></p>
              )}
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Hrfetch;