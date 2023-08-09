import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Table } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Aplicantbanner from './Aplicantbanner';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Hrappbar from '../../compnent/hr/Hrappbar';
import { FaFilePdf } from "react-icons/fa";

const Applicate = () => {
  const { id } = useParams();
  const [applicantDetails, setApplicantDetails] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApplicantDetails = async () => {
      try {
        console.log('Fetching applicant details...');
        const response = await fetch(`/api/jobs/applicants/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch applicant details');
        }
        const data = await response.json();
        console.log('API response:', data);
        const applicants = data.applicants; // Update this with the correct property holding the applicant details
        setApplicantDetails(applicants);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError('Failed to fetch data');
        setLoading(false);
      }
    };

    fetchApplicantDetails();
  }, [id]);


  const handleCheckExamClick = (jobId, applicantId) => {
    navigate(`/qavideo/${jobId}/${applicantId}`);
  };

  // if (loading) {
  //   return <p>Loading...</p>;
  // }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className='applicant_bg'>
      <Hrappbar />
      <Aplicantbanner />
      <Container className='mt-3'>
        <Row className='py-4'>
          <Col md={12}>
            <Breadcrumb className='heading_properties'>
              <Breadcrumb.Item href='/hrdata' className='link_breadcrumb'>
                Employer Dashboard
              </Breadcrumb.Item>
              <Breadcrumb.Item className='link_breadcrumb' href=''>
                All Jobs Applicants
              </Breadcrumb.Item>
              <Breadcrumb.Item className='link_breadcrumb' active>
                Check Exam
              </Breadcrumb.Item>
            </Breadcrumb>
          </Col>
        </Row>
      </Container>
      <Container className='py-4'>
        <Table striped bordered hover size='lg' responsive>
          <thead className='t_head Table_heading'>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Position</th>
              <th>Skills</th>
              <th>Resume</th>
              <th>Status</th>
              <th>Exam</th>
            </tr>
          </thead>
          <tbody>
            {applicantDetails.map((applicant, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td className='gx-5'>
                  <div className='images_user_applicant '>
                    <span className='name_applicant d-flex justify-content-betwwen'>
                      <img src={"http://localhost:8080/uploads/pimage/" + applicant.pimage} alt='' />
                      <span className='applicant_types'> {applicant.name} <br />
                        {applicant.email}</span>
                    </span>
                  </div>
                </td>
                <td className='py-4 gx-5 '>
                  <span className='name_applicant'>{applicant.title}</span>
                </td>
                <td className='py-4'>
                  <span className='name_applicant'>{applicant.skills}</span>
                </td>
                <td className='py-4 gx-5'>
                  <a
                    href={"http://localhost:8080/uploads/rdoc/" + encodeURIComponent(applicant.rdoc)}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-center'

                  >
                    <FaFilePdf className='resume_pdf'/>
                    {/* <Tooltip placement="bottom" className="in" id="tooltip-bottom">
                      Tooltip bottom
                    </Tooltip> */}
                  </a>
                </td>
                <td className='py-4'>
                  <span className='name_applicant pt-4'>
                    {applicant.applicationStatus}
                  </span>
                </td>
                <td className='py-4'>
                  <button
                    className='check_btn'
                    onClick={() => handleCheckExamClick(id, applicant._id)}
                  >
                    Answers
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default Applicate;
