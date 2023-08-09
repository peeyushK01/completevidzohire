import React from 'react';
import { Container ,Row ,Col } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';


const Applitable = () => {
    return <div className='table_react_js'>
        <Container>
            <Row>
                <Col md={12}>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>Name</th>
                                <th>Positions</th>
                                <th>Status</th>
                                <th>Apply Date </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Mark</td>
                                <td>Nodejs</td>
                                <td>Full-time</td>
                                <td>Applied</td>
                                <td>12-09-2021</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Mark</td>
                                <td>Nodejs</td>
                                <td>Full-time</td>
                                <td>Applied</td>
                                <td>12-09-2021</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>Mark</td>
                                <td>Nodejs</td>
                                <td>Full-time</td>
                                <td>Applied</td>
                                <td>12-09-2021</td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>

    </div>
}

export default Applitable;