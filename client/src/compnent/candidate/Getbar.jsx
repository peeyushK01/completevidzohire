import React, { useState } from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import vidzologo from "../../assets/colorvidzo.png";

const Getbar = () => {
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const navigate = useNavigate();
  // logout functionality
  function handleLogout() {
    const token = localStorage.getItem("id");
    // console.log("Token:", token);
    if (!token) {
      setIsLoggedOut(true);
      return;
    }

    fetch("/api/logout", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          localStorage.removeItem("token");
          setIsLoggedOut(true);
          navigate("/");
        } else {
          throw new Error("Failed to logout");
        }
      })
      .catch((error) => console.error(error));
  }
  return (
    <div className="Hr_app_bar">
      <Navbar className="hrapp_bar" expand="lg">
        <Container>
          <Navbar.Brand href="#home">
            <a href="" className="app_logo_part">
              <img src={vidzologo} alt="" />
            </a>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              <Nav.Link className="nav_lin_items" href="/profile">
                Dashboard
              </Nav.Link>
              <Nav.Link className="nav_lin_items all_jobs" href="/alljobs">
                All Jobs
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Button className="mx-auto logout_btn" onClick={handleLogout}>
            Logout
          </Button>
        </Container>
      </Navbar>
    </div>
  );
};

export default Getbar;
