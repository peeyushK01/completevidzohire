import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";
import { loginAuth } from "../../Api/authApi";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import GoogleLoginButton from "./Google";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import loginbg from "../../assets/signupbg.png";
import vidzologo from "../../assets/colorvidzo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();

    const items = { email, password, role };

    try {
      const result1 = await loginAuth(items);

      localStorage.setItem("id", result1.user._id);
      localStorage.setItem("email", result1.user.email);
      localStorage.setItem("role", result1.user.role);
      localStorage.setItem("token", result1.token);

      const cdi = localStorage.getItem("id");
      const Email = localStorage.getItem("email");
      const Token = localStorage.getItem("token");

      const payload = {
        cdi: cdi,
        email: Email,
        token: Token,
      };

      if (result1.user.role === "jobseeker") {
        const response = await fetch("http://localhost:8080/api/lookup", {
          method: "POST",
          body: JSON.stringify(payload),
          headers: { "Content-type": "application/json" },
        });

        const data = await response.json();

        if (data.data.length === 0) {
          navigate("/candidate");
        } else {
          navigate("/profile");
        }
      } else {
        navigate("/hrdata");
      }
    } catch (error) {
      toast.error("Invalid email or password", {
        position: "top-right", // Set the position of the toast
        autoClose: 3000, // Set the duration for auto-close in milliseconds
        hideProgressBar: false, // Show or hide the progress bar
        closeOnClick: true, // Close the toast on click
        pauseOnHover: true, // Pause the auto-close timer on hover
        draggable: true, // Allow the toast to be draggable
        progress: undefined, // Customize the progress bar style
        className: "toast-error", // Add a custom CSS class for the toast
      });
    }
  };

  const tooltip = (
    <Tooltip placement="right" id="tooltip-right">
      Enter your valid email
    </Tooltip>
  );

  return (
    <>
      <section className="logo_resp">
        <img src={vidzologo} alt="" />

      </section>
      <ToastContainer />
      <section className="my-5">
        <Container>
          <Row className="g-0">
            <Col md={5}>
              <div className="signup_imaages">
                <img src={loginbg} alt="signup_php" />
              </div>
            </Col>
            <Col md={1}></Col>
            <Col md={6}>
              <div className="login_bgf py-4">
                <Form>
                  <Row className="pt-3">
                    <div className="heading_login text-center">
                      <h3>
                        Hey <span className="form_reg">Welcome</span> Back{" "}
                        <span className="form_reg">*</span>
                      </h3>
                      <p>
                        Log in or sign up to discover your future job
                        opportunities...
                      </p>
                    </div>

                    <Col md={12}>
                      <div className="Input_itmes1 pt-3">
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label className="lable_heading">
                            Email address
                          </Form.Label>
                          <OverlayTrigger overlay={tooltip}>
                            <Form.Control
                              type="email"
                              className="signup_input"
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="Enter Your Registered Email"
                            />
                          </OverlayTrigger>
                        </Form.Group>
                      </div>
                    </Col>

                    <Col md={12}>
                      <div className="Input_itmes1 pt-3">
                        <Form.Group
                          className="mb-3"
                          controlId="formBasicPassword"
                        >
                          <Form.Label className="lable_heading">
                            Password
                          </Form.Label>
                          <Form.Control
                            type="password"
                            className="signup_input"
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter Your Valid Password"
                          />
                        </Form.Group>
                      </div>
                    </Col>

                    <Col md={12}>
                      <div className="add_forget d-flex justify-content-between">
                        <span className="privacy_policy1">
                          <p>
                            By continuing, I agree to the{" "}
                            <a href="">Terms of Use</a> &{" "}
                            <a href="/privacy">Privacy Policy</a>
                          </p>{" "}
                        </span>

                        <div className="forget_password">
                          <a href="/forget">Forget Password?</a>
                        </div>
                      </div>
                    </Col>

                    <div className="button_all pb-3">
                      <Button
                        type="button"
                        className="button_type_job"
                        onClick={loginHandler}
                      >
                        Submit
                      </Button>
                    </div>
                  </Row>

                  <section className="signin_with">
                    <Container>
                      <Row>
                        <Col md={12}>
                          <p className="pt-3 text-center last_heading_parts">
                            Don't have an account?{" "}
                            <Link to="/signup">
                              <a href="">Sign Up</a>
                            </Link>
                          </p>
                        </Col>

                        {/* <Col md={12}>
                          <GoogleLoginButton />
                        </Col> */}
                      </Row>
                    </Container>
                  </section>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Login;
