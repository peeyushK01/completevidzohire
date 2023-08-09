import React, { useState } from "react";
import { useParams } from "react-router-dom";
import password from "../../assets/email_for.png";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import vidzologo from "../../assets/colorvidzo.png";
import { useNavigate} from "react-router-dom";

function Fornew() {
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false); // Track success state
  const navigate = useNavigate();

  const { resetToken } = useParams();
  console.log(resetToken);

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/reset-password/${resetToken}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: newPassword,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Response Data:", data);
        setNewPassword("");
        setError(""); // Reset the error state
        setSuccess(true); // Set success state to true
      } else {
        const errorData = await response.json();
        setError(errorData.msg || "Password reset failed.");
        setSuccess(false); // Set success state to false
      }
    } catch (error) {
      console.log("Error:", error);
      setError("Password reset failed.");
      setSuccess(false); // Set success state to false
    }
  };

  const rediectpage = ()=>{
      navigate("/login")
  }

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
                      Your new password must be <br />
                      different from the previously used password*
                    </p>
                  </div>

                  <div className="forget_email_input">
                    <Form onSubmit={handleSubmit}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="lable_heading">
                          New Password
                        </Form.Label>
                        <Form.Control
                          type="password"
                          value={newPassword}
                          onChange={handleNewPasswordChange}
                          className="signup_input"
                          placeholder="Enter Your New Password"
                          required
                        />
                      </Form.Group>
                      {error && (
                        <div className="cards_images mt-4">
                          {error}
                        </div>
                      )}

                      {success && (
                        <div className="message_error mt-4 success-message">
                          Password successfully changed Go back the Login page.
                        </div>
                      )}

                      <div className="button_forget mt-4">
                        <Button type="submit" className="forget_btn" onClick={rediectpage}>
                          SEND
                        </Button>
                      </div>
                    </Form>
                  </div>
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

export default Fornew;
