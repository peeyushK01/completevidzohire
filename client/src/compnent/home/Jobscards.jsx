import React from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import '../../style/Style.css';
import Cate1 from '../../assets/c1.svg'


const Jobscards = () => {
  return (
    <div className="cards_cate py-4">
      <Container>
        <Row>
          <Col md={3}>
            <div className='cards_img py-2'>
              <img src={Cate1} alt='position1' />
              <div className='position_names'>
                <h4>Account & Finance</h4>
              </div>

              <div className='jobs_avaiables'>
                <p>Job Available: 44</p>
              </div>
            </div>
          </Col>
          <Col md={3}>
            <div className='cards_img py-2'>
              <img src={Cate1} alt='position1' />

              <div className='position_names'>
                <h4>Account & Finance</h4>
              </div>

              <div className='jobs_avaiables'>
                <p>Job Available: 44</p>
              </div>

            </div>
          </Col>
          <Col md={3}>
            <div className='cards_img py-2'>
              <img src={Cate1} alt='position1' />

              <div className='position_names'>
                <h4>Account & Finance</h4>
              </div>

              <div className='jobs_avaiables'>
                <p>Job Available: 44</p>
              </div>

            </div>
          </Col>

          <Col md={3}>
            <div className='cards_img py-2'>
              <img src={Cate1} alt='position1' />

              <div className='position_names'>
                <h4>Account & Finance</h4>
              </div>

              <div className='jobs_avaiables'>
                <p>Job Available: 44</p>
              </div>

            </div>
          </Col>

        </Row>

        <Row className='mt-4'>
          <Col md={3}>
            <div className='cards_img py-2'>
              <img src={Cate1} alt='position1' />
              <div className='position_names'>
                <h4>Account & Finance</h4>
              </div>

              <div className='jobs_avaiables'>
                <p>Job Available: 44</p>
              </div>
            </div>
          </Col>
          <Col md={3}>
            <div className='cards_img py-2'>
              <img src={Cate1} alt='position1' />

              <div className='position_names'>
                <h4>Account & Finance</h4>
              </div>

              <div className='jobs_avaiables'>
                <p>Job Available: 44</p>
              </div>

            </div>
          </Col>
          <Col md={3}>
            <div className='cards_img py-2'>
              <img src={Cate1} alt='position1' />

              <div className='position_names'>
                <h4>Account & Finance</h4>
              </div>

              <div className='jobs_avaiables'>
                <p>Job Available: 44</p>
              </div>

            </div>
          </Col>

          <Col md={3}>
            <div className='cards_img py-2'>
              <img src={Cate1} alt='position1' />

              <div className='position_names'>
                <h4>Account & Finance</h4>
              </div>

              <div className='jobs_avaiables'>
                <p>Job Available: 44</p>
              </div>

            </div>
          </Col>

        </Row>
      </Container>

    </div>
  )
}
export default Jobscards