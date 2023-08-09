import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'



const Questionbanner = () => {
    return <div className='question_banner1'>
        <Container>
            <div className='question_banner mt-3'>
                <Row>
                    <Col md={12}>
                        <div className='complete_para text-center'>
                            <div className='text_bannwr'>
                                <h3>SELECT GREAT HIRNG FROM <span className='assignment_color'>EXAM INSIGHTS.</span></h3>
                            </div>
                               
                            <div className='para_exam pt-3'>
                                <p> "Transform your hiring process with an in-depth exam <br /> results to find the top talented people." </p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </Container>
    </div>
}

export default Questionbanner;