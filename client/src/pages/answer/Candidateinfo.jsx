import React from 'react';
import { Card, Col, Container } from 'react-bootstrap';
import { candidatelogo } from '../../assets/candidatelogo.png';

const Candidateinfo = () => {
    return <div className='candidate_info'>

        <Container>
            <Row>
                <Col md={12}>
                    <Card>
                        <div className='card_candidate_info'>
                           <img src={candidatelogo} alt="candidatelogo" />


                        </div>
                    </Card>

                </Col>
            </Row>
        </Container>

    </div>
}