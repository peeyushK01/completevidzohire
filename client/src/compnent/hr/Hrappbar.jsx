import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import vidzologo from "../../assets/colorvidzo.png";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Hrappbar = () => {
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  const navigate = useNavigate();
  // logout Api Part
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
  // end
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
              <Nav.Link className="nav_lin_items" href="/hrdata">
                Dashboard
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>

          <Form className="d-flex">
            <Button className=" logout_btn" onClick={handleLogout}>
              Logout
            </Button>
          </Form>
        </Container>
      </Navbar>
    </div>
  );
};

export default Hrappbar;