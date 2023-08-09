import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import '../../style/Style.css';


const Jobs = () => {


    return (
        <>
            <section className='job_treading py-4'>
                <Container>
                    <Row>
                        <Col md={12}>
                            <div className='job_heading'>
                                <h3>Trending Jobs <span className='job_secondary'> Category </span> </h3>
                            </div>


                            <div className='para_jobs'>
                                <p>To choose your trending job dream & to make future bright.</p>


                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}


export default Jobs