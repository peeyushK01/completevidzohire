import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Table } from 'react-bootstrap';

const Applicate = () => {
  const [applicantDetails, setApplicantDetails] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApplicantDetails = async () => {
      try {
        const response = await fetch(`/api/jobs/applicants/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch applicant details');
        }
        const data = await response.json();
        console.log(data,"job");
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

  const handleCheckExamClick = async () => {
    try {
      const response = await fetch("/api/videos/64a25aa89469147bb61dc1e8/64a25aa89469147bb61dc1e9/64a253f37b3f6e82b82cb903");
      if (!response.ok) {
        throw new Error('Failed to fetch recorded video');
      }
      const rawData = await response.text(); // Fetch the raw response data
      console.log(rawData); // Log the raw response to check its content
    } catch (error) {
      console.error(error);
      // Handle the error, e.g., show an error message to the user.
    }
  };
  
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h4>Applicant Details:</h4>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Position</th>
            <th>Skills</th>
            <th>Status</th>
            <th>Apply Date</th>
            <th>Exam</th>
          </tr>
        </thead>
        <tbody>
          {applicantDetails.map((applicant, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                <div className="images_user_applicant d-flex">
                  <span className='name_applicant'>
                    {applicant.name} <br />
                    {applicant.email}
                  </span>
                </div>
              </td>
              <td>
                <span className='name_applicant'>{applicant.title}</span>
              </td>
              <td>
                <span className='name_applicant'>{applicant.skills}</span>
              </td>
              <td>
                <span className='name_applicant'>Pending</span>
              </td>
              <td>
                <span className='name_applicant'>12-05-2023</span>
              </td>
              <td>
                <span className='name_applicant'>
                  <Button
                    className='secondary_btn'
                    onClick={() => handleCheckExamClick(applicant.jobId, applicant.questionId, applicant.candidateId)}
                  >
                    Check Exam
                  </Button>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Applicate;
