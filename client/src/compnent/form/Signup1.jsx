import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { useState } from "react";
import "../../style/Style.css";
import login from "../../assets/login.jpg";
import { FaEnvelope } from "react-icons/fa";
import { signAuth } from "../../Api/authApi";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");

  const Navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user-info")) {
      Navigate.push("/add");
    }
  });

  const loginHandler = async (e) => {
    const items = { email, password };
    // console.log(items)
  };

  const submitHandler = async (e) => {
    let details = { name, email, password, lastname };
    const result = signAuth(details);
    // console.log(result)
  };

  return (
    <div className="py-4 login_bg">
      <Container>
        <Row className="g-0">
          <Col md={6}>
            <div className="login_imaages">
              <img src={login} alt="login_php" />
            </div>
          </Col>
          <Col md={6} py={5}>
            <div className="login_bgf pt-3">
              <Form>
                <Row className="pt-3">
                  <div className="heading_login text-center">
                    <h3>User Signup</h3>
                    <p>Hey Enter Your Details For Login Your Dashboard</p>
                  </div>
                  <Col md={12}>
                    <div className="form_login_center">
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="lable_heading">
                          First Name
                        </Form.Label>
                        <span>
                          <FaEnvelope />
                        </span>{" "}
                        <Form.Control
                          type="text"
                          value={name}
                          className="without_input"
                          onChange={(e) => {
                            setName(e.target.value);
                          }}
                          placeholder="Enter First Name"
                        />
                      </Form.Group>
                    </div>
                  </Col>
                  <Col md={12}>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label className="lable_heading">
                        Last Name
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={lastname}
                        className="without_input"
                        onChange={(e) => setLastname(e.target.value)}
                        placeholder="Enter Last Name"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="pt-3">
                  <Col md={12}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label className="lable_heading">Email</Form.Label>
                      <Form.Control
                        type="email"
                        value={email}
                        className="without_input"
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                        placeholder="Enter email"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label className="lable_heading">
                        Password
                      </Form.Label>
                      <Form.Control
                        type="password"
                        value={password}
                        className="without_input"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <div className="button_all pb-3">
                  <Button
                    type="button"
                    className="button_type_job"
                    onClick={submitHandler}
                  >
                    Submit
                  </Button>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;
