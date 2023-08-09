import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Breadcrumb from "react-bootstrap/Breadcrumb";



const Aplicanrbanner = () => {
    return <div className='aplicants_banner1 mt-3'>
        <Container>
            <div className='aplicants_banner'>
                <div className='content_parts_applicant py-5'>
                    <Row>
                        <Col md={12}>
                            <div className='content_header text-center'>
                                <h3>Applicant View</h3>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </Container>


    </div>
}

export default Aplicanrbanner;