import React from "react";
import footer from '../../compnent/home/Footer'
import {
    MDBContainer,
    MDBBtnGroup,
    MDBBtn,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardFooter,
    MDBTypography,
    MDBIcon,
    MDBCardTitle,
} from "mdb-react-ui-kit";
import Footer from "../../compnent/home/Footer";

const Pricing = () => {
    return (
        <MDBContainer className="py-5 ">
            <div className="text-center">
                <div classaName="mb-4 secondary_text">
                    <h3>Pricing</h3>
                </div>

                <MDBBtnGroup className="mb-4 mt-4" aria-label="Basic example">
                    <button href="#" className="more_view">
                        Monthly billing
                    </button>

                    <button href="#" className="more_view"> Annual billign 
                     <small>(2 months FREE)</small>
                    </button>
                </MDBBtnGroup>
            </div>

            <MDBRow className="mt-4">
                <MDBCol md="3">
                    <MDBCard>
                        <MDBCardBody className="mx-2">
                            <MDBCardTitle className="my-2 pricing_head">Post jobs for free*</MDBCardTitle>
                            <p className="text-muted pricing_description">
                            Get premium placement when you sponsor your job posting
                            </p>
                            <p className="h2 fw-bold">
                                $00
                                <small className="secondary_mo" style={{ fontSize: "18px" }}>
                                    /mo
                                </small>
                            </p>
                            <MDBBtn
                                href="#"
                                color="dark"
                                className="d-block mb-2 mt-3  bg-pricing"
                            >
                                Post a job
                            </MDBBtn>
                        </MDBCardBody>

                        <MDBCardFooter>
                            <p
                                className="text-uppercase fw-bold"
                                style={{ fontSize: "12px" }}
                            >
                                What's included
                            </p>

                            <MDBTypography listUnStyled className="mb-0 px-4">
                                <li className="mb-3">
                                    <MDBIcon fas icon="check" className="text-success me-3" />
                                    <small>Lorem Ipsum</small>
                                </li>
                                <li className="mb-3">
                                    <MDBIcon fas icon="check" className="text-success me-3" />
                                    <small>Lorem Ipsum</small>
                                </li>
                                <li className="mb-3">
                                    <MDBIcon fas icon="check" className="text-success me-3" />
                                    <small>Lorem Ipsum</small>
                                </li>
                            </MDBTypography>
                        </MDBCardFooter>
                    </MDBCard>
                </MDBCol>

                <MDBCol md="3">
                    <MDBCard border="dark">
                        <MDBCardBody className="mx-2">
                            <MDBCardTitle className="my-2 pricing_head">Post jobs for candidates*</MDBCardTitle>
                            <p className="text-muted pricing_description">
                            Get premium placement when you sponsor your job posting
                            </p>
                            <p className="h2 fw-bold">
                                $20
                                <small className="secondary_mo" style={{ fontSize: "18px" }}>
                                    /mo
                                </small>
                            </p>
                            <MDBBtn
                                href="#"
                                color="dark"
                                className="d-block mb-2 mt-3   bg-pricing"
                            >
                                Get Started 
                            </MDBBtn>
                        </MDBCardBody>

                        <MDBCardFooter>
                            <p
                                className="text-uppercase fw-bold"
                                style={{ fontSize: "12px" }}
                            >
                                What's included
                            </p>

                            <MDBTypography listUnStyled className="mb-0 px-4">
                                <li className="mb-3">
                                    <MDBIcon fas icon="check" className="text-success me-3" />
                                    <small>Lorem Ipsum</small>
                                </li>
                                <li className="mb-3">
                                    <MDBIcon fas icon="check" className="text-success me-3" />
                                    <small>Lorem Ipsum</small>
                                </li>
                                <li className="mb-3">
                                    <MDBIcon fas icon="check" className="text-success me-3" />
                                    <small>Lorem Ipsum</small>
                                </li>
                            </MDBTypography>
                        </MDBCardFooter>
                    </MDBCard>
                </MDBCol>

                <MDBCol md="3">
                    <MDBCard border="dark" className="height_price">
                        <MDBCardBody className="mx-2">
                            <MDBCardTitle className="my-2 pricing_head">Post jobs for campaign*</MDBCardTitle>
                            <p className="text-muted pricing_description">
                            Get premium placement when you sponsor your job posting
                            </p>
                            <p className="h2 fw-bold">
                                $40
                                <small className="secondary_mo" style={{ fontSize: "18px" }}>
                                    /mo
                                </small>
                            </p>
                            <MDBBtn
                                href="#"
                                color="dark"
                                className="d-block mb-2 mt-3   bg-pricing"
                            >
                               <strong>Contact Us</strong> 
                            </MDBBtn>
                        </MDBCardBody>

                        <MDBCardFooter>
                            <p
                                className="text-uppercase fw-bold"
                                style={{ fontSize: "12px" }}
                            >
                                What's included
                            </p>

                            <MDBTypography listUnStyled className="mb-0 px-4">
                                <li className="mb-3">
                                    <MDBIcon fas icon="check" className="text-success me-3" />
                                    <small>Lorem Ipsum</small>
                                </li>
                                <li className="mb-3">
                                    <MDBIcon fas icon="check" className="text-success me-3" />
                                    <small>Lorem Ipsum</small>
                                </li>
                                <li className="mb-3">
                                    <MDBIcon fas icon="check" className="text-success me-3" />
                                    <small>Lorem Ipsum</small>
                                </li>
                                
                               
                            </MDBTypography>
                        </MDBCardFooter>
                    </MDBCard>
                </MDBCol>

                <MDBCol md="3">
                    <MDBCard border="dark">
                        <MDBCardBody className="mx-2">
                            <MDBCardTitle className="my-2 pricing_head">Post jobs for Enterprise*</MDBCardTitle>
                            <p className="text-muted pricing_description">
                            Get premium placement when you sponsor your job posting
                            </p>
                            <p className="h2 fw-bold">
                                $55
                                <small className="secondary_mo" style={{ fontSize: "18px" }}>
                                    /mo
                                </small>
                            </p>
                            <MDBBtn
                                href="#"
                                color="dark"
                                className="d-block mb-2 mt-3  bg-pricing"
                            >
                               Post For Enterprise
                            </MDBBtn>
                        </MDBCardBody>

                        <MDBCardFooter>
                            <p
                                className="text-uppercase fw-bold"
                                style={{ fontSize: "12px" }}
                            >
                                What's included
                            </p>

                            <MDBTypography listUnStyled className="mb-0 px-4">
                                <li className="mb-3">
                                    <MDBIcon fas icon="check" className="text-success me-3" />
                                    <small>Lorem Ipsum</small>
                                </li>
                                <li className="mb-3">
                                    <MDBIcon fas icon="check" className="text-success me-3" />
                                    <small>Lorem Ipsum</small>
                                </li>
                                <li className="mb-3">
                                    <MDBIcon fas icon="check" className="text-success me-3" />
                                    <small>Lorem Ipsum</small>
                                </li>
                            </MDBTypography>
                        </MDBCardFooter>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>  
    );
    
}

export default Pricing;