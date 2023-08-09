import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { Col, Row, Container } from "react-bootstrap";
import { TbArrowBadgeLeft } from "react-icons/tb";
import { TbArrowBadgeRight } from "react-icons/tb";
import { MdOutlineAssignment, MdLocationOn } from "react-icons/md";
import pageload from "../../assets/loading.gif"

const Getall = (props) => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const [workLocationFilter, setWorkLocationFilter] = useState("");
  const [positionFilter, setPositionFilter] = useState("");
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `/api/get-job?page=${currentPage}&search=${positionFilter}&workLocation=${workLocationFilter}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const jsonData = await response.json();
      // console.log(jsonData)
      setData(jsonData.jobs);
      setIsLastPage(jsonData.jobs.length === 0);
      setIsLoading(false);
    } catch (error) {
      // console.error(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, positionFilter, workLocationFilter]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
      setIsLastPage(false);
    }
  };

  const handleNextPage = () => {
    if (!isLastPage) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePositionFilter = (e) => {
    const filterValue = e.target.value.toLowerCase();
    setPositionFilter(filterValue);
  };

  const handleWorkLocationFilter = (e) => {
    const filterValue = e.target.value.toLowerCase();
    setWorkLocationFilter(filterValue);
  };

  const handleViewJob = (jobId) => {
    navigate(`/jd/${jobId}`);
  };

  return (
    <>
      <Container>
        <section className="header_alljobs mt-3">
          <div className="heading_parts text-center">
            <h3>
              <span className="header_one_all">Find Your </span> Dream Jobs...
            </h3>
          </div>

          <div>
            <div className="search_input d-flex justify-content-center">
              <input
                type="search"
                placeholder="Enter Job Position"
                value={positionFilter}
                onChange={handlePositionFilter}
              />

              <input
                type="search"
                placeholder="Enter Work Location"
                value={workLocationFilter}
                onChange={handleWorkLocationFilter}
              />
            </div>
          </div>
        </section>
      </Container>

      <section className="table_numer">
        <Container>
          <Row className="py-4">
            <Col md={6}>
              <div className="all_jobs_caterio pt-4">
                <h3>List Of Jobs</h3>
              </div>
            </Col>
          </Row>
        </Container>
        {data.length > 0 ? (
          <Container>
            <Row>
              {data.map((item) => (
                <Col md={4} className="py-3" key={item._id}>
                  <Card className="cards_data1">
                    <Card.Body>
                      <Card.Text>
                        <div>
                          <div className="company_heading">
                            <p>{item.company}</p>
                          </div>
                          <div className="position d-flex">
                            <span className="assign"><MdOutlineAssignment /></span>

                            <div>
                              <span className="para_pa"> {item.position} ({item.worktype})</span>
                            </div>
                          </div>
                          <div className="work_location d-flex pt-2">
                            <span className="assign"><MdLocationOn /> </span>

                            <div className="location_dr">
                              <span className="para_pa">{item.workLocation}</span>
                            </div>
                          </div>
                          <button
                            className="Apply_btn mt-3"
                            onClick={() => handleViewJob(item._id)}
                          >
                            View Job
                          </button>
                          {/* <button className="Apply_btn1">Saved</button> */}
                        </div>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        ) : (
          isLoading ? <p className="error_message loading_gif">
            <div className="gif">
              <img src={pageload} alt="" />
            </div>
          </p>
            : <p className="error_message">No jobs found.</p>
        )}

        <div className="pagination_btn d-flex mt-4">
          <button
            className="pagination"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            <TbArrowBadgeLeft className="page_arrow" />
            Previous
          </button>
          <span className="current_page">{currentPage}</span>
          <button
            className="pagination"
            onClick={handleNextPage}
            disabled={isLastPage}
          >
            Next
            <TbArrowBadgeRight className="page_arrow" />
          </button>
        </div>
      </section>
    </>
  );
};

export default Getall;