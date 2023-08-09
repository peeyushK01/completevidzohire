import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import logo from "../../assets/vidzohirelogo.png"
import { useNavigate } from "react-router-dom";

const Navbars = () => {
  const navigate = useNavigate();

  const jobseeker = () => {
    navigate("/login");
  };

  const employee = () => {
    navigate("/login");
  };

  return (
    <>
      <section className="Job_portals_bg pt-3">
        <Navbar expand="lg">
          <Container>
            <Navbar.Brand href="#home" className="home_navbar">
              <img src={logo} alt="videologo" className="logo_video" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mx-auto">
                <Nav.Link href="#home" className="Nav_list">
                  Home
                </Nav.Link>
                <Nav.Link href="/about" className="Nav_list">
                  About
                </Nav.Link>
                <Nav.Link href="/pricing" className="Nav_list">
                  Pricing
                </Nav.Link>
                <Nav.Link href="#Refer" className="Nav_list">
                  Refer&Earn
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
            <section className="button_more">
              <Button className="more_view mr-4" onClick={jobseeker}>
                Login
              </Button>
            </section>
          </Container>
        </Navbar>
      </section>
    </>
  );
};

export default Navbars;
