import { useState, useEffect } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Card from 'react-bootstrap/Card';

const Savedtabs = () => {
  const [jobHistory, setJobHistory] = useState([]);
  const [key, setKey] = useState('home');

  useEffect(() => {
    const fetchJobHistory = async () => {
      try {
        const response = await fetch('/user/jobhistory');
        const data = await response.json();
        setJobHistory(data);
      } catch (error) {
        // console.error('Error retrieving job history:', error);
      }
    };

    fetchJobHistory();
  }, []);

  return (
    <div className='tabs_saved py-5'>
      <Container>
        <Row>
          <Col md={12}>
            <div className='headind_tabs'>
              <h2>
                Candidate <span className='secondary_1'>Status</span>{' '}
              </h2>
            </div>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row className='mt-4'>
          <Col md={12}>
            <Tabs
              id='controlled-tab-example'
              activeKey={key}
              onSelect={(k) => setKey(k)}
              className='mb-3'
            >
              <Tab eventKey='home' title='Applied Jobs'>
                <Container>
                  <Row>
                    <Col md={4}>
                      <Card style={{ width: '100%' }} className='applied_crad'>
                        <Card.Body>
                          <Card.Title className='company_title'>Krytons Consultency private limited</Card.Title>
                          <Card.Subtitle className='mb-2 card_title_po pt-2'>
                            CONTENT Writer
                          </Card.Subtitle>
                          <Card.Subtitle className='mb-2 card_title_po pt-2'>
                            Jaipur , Rajasthan
                          </Card.Subtitle>
                          <Card.Text className='text_card pt-2'>Collaborate with team members to generate ideas. </Card.Text>
                          <Card.Subtitle className='mb-2 text-muted card_title_po'>
                            Status: Applied Jobs
                          </Card.Subtitle>
                        </Card.Body>
                      </Card>
                    </Col>

                    <Col md={4}>
                      <Card style={{ width: '100%' }} className='applied_crad'>
                        <Card.Body>
                          <Card.Title className='company_title'>Softtech India</Card.Title>
                          <Card.Subtitle className='mb-2 card_title_po pt-2'>
                            SEO Analysist
                          </Card.Subtitle>
                          <Card.Subtitle className='mb-2 card_title_po pt-2'>
                            Jaipur , Rajasthan
                          </Card.Subtitle>
                          <Card.Text className='text_card pt-2'>Collaborate with team members to generate ideas. </Card.Text>
                          <Card.Subtitle className='mb-2 text-muted card_title_po'>
                            Status: Applied Jobs
                          </Card.Subtitle>
                        </Card.Body>
                      </Card>
                    </Col>

                    <Col md={4}>
                      <Card style={{ width: '100%' }} className='applied_crad'>
                        <Card.Body>
                          <Card.Title className='company_title'>PROVIS TECHNOLOGIES </Card.Title>
                          <Card.Subtitle className='mb-2 card_title_po pt-2'>
                            PHP Developer
                          </Card.Subtitle>
                          <Card.Subtitle className='mb-2 card_title_po pt-2'>
                            Jaipur , Rajasthan
                          </Card.Subtitle>
                          <Card.Text className='text_card pt-2'>Collaborate with team members to generate ideas. </Card.Text>
                          <Card.Subtitle className='mb-2 text-muted card_title_po'>
                            Status: Applied Jobs
                          </Card.Subtitle>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                </Container>
              </Tab>
              <Tab eventKey='profile' title='Saved Jobs'>
                <Container>
                  <Row>
                  <Col md={4}>
                      <Card style={{ width: '100%' }} className='applied_crad'>
                        <Card.Body>
                          <Card.Title className='company_title'>PROVIS TECHNOLOGIES </Card.Title>
                          <Card.Subtitle className='mb-2 card_title_po pt-2'>
                            PHP Developer
                          </Card.Subtitle>
                          <Card.Subtitle className='mb-2 card_title_po pt-2'>
                            Jaipur , Rajasthan
                          </Card.Subtitle>
                          <Card.Text className='text_card pt-2'>Collaborate with team members to generate ideas. </Card.Text>
                          <Card.Subtitle className='mb-2 text-muted card_title_po'>
                            Status: Saved Jobs
                          </Card.Subtitle>
                        </Card.Body>
                      </Card>
                    </Col>

                    <Col md={4}>
                      <Card style={{ width: '100%' }} className='applied_crad'>
                        <Card.Body>
                          <Card.Title className='company_title'>PROVIS TECHNOLOGIES </Card.Title>
                          <Card.Subtitle className='mb-2 card_title_po pt-2'>
                            PHP Developer
                          </Card.Subtitle>
                          <Card.Subtitle className='mb-2 card_title_po pt-2'>
                            Jaipur , Rajasthan
                          </Card.Subtitle>
                          <Card.Text className='text_card pt-2'>Collaborate with team members to generate ideas. </Card.Text>
                          <Card.Subtitle className='mb-2 text-muted card_title_po'>
                            Status: Saved Jobs
                          </Card.Subtitle>
                        </Card.Body>
                      </Card>
                    </Col>

                    <Col md={4}>
                      <Card style={{ width: '100%' }} className='applied_crad'>
                        <Card.Body>
                          <Card.Title className='company_title'>PROVIS TECHNOLOGIES </Card.Title>
                          <Card.Subtitle className='mb-2 card_title_po pt-2'>
                            PHP Developer
                          </Card.Subtitle>
                          <Card.Subtitle className='mb-2 card_title_po pt-2'>
                            Jaipur , Rajasthan
                          </Card.Subtitle>
                          <Card.Text className='text_card pt-2'>Collaborate with team members to generate ideas. </Card.Text>
                          <Card.Subtitle className='mb-2 text-muted card_title_po'>
                            Status: Saved Jobs
                          </Card.Subtitle>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                </Container>
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Savedtabs;