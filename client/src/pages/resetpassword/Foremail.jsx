import React, { useState, useEffect } from "react";
import password from "../../assets/email_for.png";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { resetPassword } from "../../Api/authApi";
import vidzologo from "../../assets/colorvidzo.png";

function Foremail() {
  const [resetEmail, setResetEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  useEffect(() => {
    let timer;
    if (emailSent) {
      timer = setTimeout(() => {
        setEmailSent(false);
      }, 5000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [emailSent]);

  const handleForgetPassword = async (e) => {
    e.preventDefault();

    try {
      await resetPassword(resetEmail);
      // Reset password email sent successfully
      setEmailSent(true);
      setResetEmail(""); // Clear the input field
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="forget_email">
      <div className="logo_forget">
        <img src={vidzologo} alt="forget_logo" />
      </div>

      <Container>
        <Row>
          <Col md={2}></Col>
          <Col md={8}>
            <div className="cards_images my-5">
              <Row>
                <Col md={6}>
                  <div className="forget_images pt-3">
                    <img src={password} alt="password" />
                  </div>
                </Col>
                <Col md={6}>
                  <div className="forget_heading pt-5">
                    <p>
                      Please enter your registered <br /> email address to
                      receive a verification code****
                    </p>
                  </div>

                  <div className="forget_email_input mt-4">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label className="lable_heading">
                        Email address
                      </Form.Label>
                      <Form.Control
                        type="email"
                        className="signup_input"
                        placeholder="Enter Your Register Email"
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                      />
                    </Form.Group>
                  </div>

                  <div className="button_forget mt-4">
                    <Button
                      className="forget_btn"
                      onClick={handleForgetPassword}
                    >
                      SEND
                    </Button>
                  </div>

                  {emailSent && (
                    <div className="message_error mt-4">
                      Email sent in your mail, please check.
                    </div>
                  )}
                </Col>
              </Row>
            </div>
            <div className="forget_em"></div>
          </Col>
          <Col md={2}></Col>
        </Row>
      </Container>
    </div>
  );
}

export default Foremail;
