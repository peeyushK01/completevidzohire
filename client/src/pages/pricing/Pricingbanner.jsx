import React from "react";
import { Container ,Row ,Col } from "react-bootstrap";
import pricingimg from '../../assets/Pricingplans.png'


const Pricingbanner = () => {
    return <div className="princing_banner py-5">
        <Container>
            <Row>
                <Col md={5}>
                    <div className="pricing_text py-5">
                        <div className="heading_pricing">
                            <h3>Our Pricing <span className="pricing-color">Policy</span></h3>
                        </div>

                        <div className="princing_para">
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut culpa delectus earum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam itaque explicabo ab error tempore corporis vitae voluptate illum facere sequi. </p>
                        </div>

                        <div className="pricing_btn">
                            <button className="btn btn-primary">Pricing</button>

                        </div>
                    </div>
                </Col>
            </Row>
        </Container>


    </div>
}

export default Pricingbanner;