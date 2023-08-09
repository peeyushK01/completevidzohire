import { Col, Container, Row } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import jd from "../assets/jd.png";
import { FaBriefcase, FaMapMarkerAlt } from "react-icons/fa";

const Jdcompany = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const [filterVal, setFilterVal] = useState("");
  const [searchApiData, setSearchApiData] = useState();
  const navigate = useNavigate();

  // get Api
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `/api/get-job?page=${currentPage}&search=${filterVal}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const jsonData = await response.json();
      setData(jsonData.jobs);
      setSearchApiData(jsonData);
      setIsLastPage(jsonData.jobs.length === 0); // Check if the fetched data is empty
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, filterVal]);
  // end

  const handleApplyJob = async (jobId) => {
    try {
      const response = await fetch(`/api/apply-job/${jobId}`, {
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
      // alert("Job application submitted successfully!");

      // Handle the success case here (e.g., show a success message)
    } catch (error) {
      alert("Already Applied Jobs");
      console.error(error);
      // Handle the error case here (e.g., show an error message)
      navigate("/video");
    }
  };

  const handleFilter = (e) => {
    if (e.target.value === "") {
      setData(searchApiData.jobs);
    } else {
      const filterResult = searchApiData.jobs.filter((item) =>
        item.position.toLowerCase().includes(e.target.value.toLowerCase())
      );
      if (filterResult.length > 0) {
        setData(filterResult);
      } else {
        setData([{ position: "No Data Found" }]);
      }
    }
    setFilterVal(e.target.value);
  };

  return (
    <div className="Jd_company py-5">
      <Container>
        <Row>
          <Col md={6}>
            <section className="card_job_details">
              <div className="compnay_name">
                <p>{item.company}</p>
              </div>

              <div className="position">
                <p>{item.position}</p>
              </div>

              <div className="work_types d-flex">
                <p>{item.worktype}</p>
                <p>Part-Time</p>
              </div>

              <div className="location_compnay pb-2">
                <span className="location_part">
                  <FaMapMarkerAlt className="logo_mark" /> {item.workLocation}
                </span>{" "}
              </div>

              <div className="job_type pt-1">
                <span className="location_part">
                  <FaBriefcase className="logo_mark" /> FullTime{" "}
                </span>
              </div>

              <div className="two_types pt-3">
                <button
                  className="Apply_btn"
                  onClick={() => handleApplyJob(item._id)}
                  disabled={isLoading}
                >
                  Apply
                </button>
                <button className="Apply_btn1">Saved</button>
              </div>
            </section>

            <div className="About_jobs pt-4">
              <button
                className="Apply_btn"
                onClick={() => handleApplyJob(data._id)}
                disabled={isLoading}
              >
                Apply
              </button>
              <h3>About the Job</h3>
              <p className="pt-2">
                The ideal candidate is a skilled creative professional that
                thrives in a team environment. You will create the look, layout,
                and features of our product tools, websites, and landing
                pages.Responsibilities
              </p>

              <ul>
                <li className="pt-2">
                  Conceptualise and create intuitive, engaging, and
                  brand-consistent web experiences.
                </li>
                <li>
                  Continually improve and optimize user experience for sites.
                </li>
                <li>
                  Collaborate in concept development and design ideation
                  cross-functionally to help define a creative strategy.
                </li>
                <li>
                  Collaborating with other web development team members,
                  including developers and content creators, to ensure that the
                  website meets the client's needs.
                </li>
              </ul>

              <div className="qualification pt-3">
                <h3>qualification</h3>
                <li>Bachelor's degree or equivalent.</li>
                <li>Deep understanding of HTML, CSS, Bootstrap</li>
                <li>Basics of PHP and Javascript</li>
                <li>Proficient in Website CMS platform on WordPress</li>
                <li>Good communication skills</li>
              </div>
            </div>
          </Col>

          <Col md={1}></Col>

          <Col md={5}>
            <div className="images">
              <img src={jd} alt="" />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Jdcompany;
