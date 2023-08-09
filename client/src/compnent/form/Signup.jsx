import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { useState } from "react";
import "../../style/Style.css";
import signup from "../../assets/loginbg.png";
import { signAuth } from "../../Api/authApi";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import Login from "./Login";
import * as Yup from "yup";
import { ToastContainer } from "react-toastify";
import vidzologo from "../../assets/colorvidzo.png";

const initialValues = {
  name: "",
  email: "",
  password: "",
  role: "",
  compname: "",
};

const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string()
    .required("Required")
    .min(6, "Must be at least 8 characters"),
  role: Yup.string().required("Required"),
});

function Signup() {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [name, setName] = useState("");
  // const [lastname, setLastname] = useState("");
  // const [error, setError] = useState({
  //     errors: {},
  //     isError: false,
  // });

  // if (error.isError) {
  //     Toast.error("form data is invaild, correct all the details then submit " )

  // }

  const [em, setEm] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [company, setCompany] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user-info")) {
      navigate.push("/add");
    }
  }, [navigate]);

  // import { toast } from 'react-toastify';

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await signAuth(values);
        if (response.em == true) {
          setEm(true);
        }
        const data = JSON.parse(response);
        // Show success message using toast
        toast.success("Account created successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          className: "toast-success",
        });
      } catch (error) {
        formik.setErrors({ server: error.message });
        // toast.error("An error occurred, please try again later");
      }
      navigate("/login");
    },
  });

  if (em) {
    alert("error occured");
  }

  // const submitHandler = async (e) => {
  //     let details = { name, email, password, lastname }

  //     const result = signAuth(details)

  //     console.log(result)
  // }

  return (
    <div className="py-4 ">
      <section className="logo_resp">
        <img src={vidzologo} alt="" />
      </section>

      <Container>
        <ToastContainer />
        <Row className="g-0">
          <Col md={5} className="py-5">
            <div className="login_imaages">
              <img src={signup} alt="login_php" />
            </div>
          </Col>
          <Col md={1} />
          <Col md={6} py={5}>
            <div className="login_bgf pt-3">
              <Form onSubmit={formik.handleSubmit}>
                <Row className="pt-3">
                  <div className="heading_login text-center">
                    <h3>
                      Welcome ! Fill Your{" "}
                      <span className="form_reg"> Register Details</span>{" "}
                    </h3>
                    <p>
                      Open the doors to your digital world and unleash limitless
                      possibilities <br /> to grab your dream job.
                    </p>
                  </div>
                  <Col md={12}>
                    <div className="form_login_center">
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label className="input_lables">
                          Name
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter Your name"
                          name="name"
                          className="input_singin"
                          value={formik.values.name}
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          isInvalid={
                            formik.touched.name && !!formik.errors.name
                          }
                        />
                        <Form.Control.Feedback type="invalid">
                          {formik.errors.name}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </div>
                  </Col>

                  <Col md={12}>
                    <Form.Label className="input_lables">Role</Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      type="select"
                      name="role"
                      className="input_singin"
                      value={formik.values.role}
                      onBlur={formik.handleBlur}
                      onChange={(e) => {
                        formik.handleChange(e);
                        setSelectedRole(e.target.value);
                        setCompany("");
                      }}
                      isInvalid={formik.touched.role && !!formik.errors.role}
                    >
                      <option selected>
                        Open this select menu
                      </option>
                      <option value="jobseeker">Candidate</option>
                      <option value="employer">HR</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.role}
                    </Form.Control.Feedback>
                  </Col>
                </Row>
                <Row className="pt-3">
                  <Col md={12}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label className="lable_heading">Email</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter email"
                        name="email"
                        className="input_singin"
                        value={formik.values.email}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        isInvalid={
                          formik.touched.email && !!formik.errors.email
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.email}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label className="lable_heading">
                        Password
                      </Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Enter password"
                        name="password"
                        className="input_singin"
                        value={formik.values.password}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        isInvalid={
                          formik.touched.password && !!formik.errors.password
                        }
                      />
                      <Form.Control.Feedback type="invalid">
                        {formik.errors.password}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  {selectedRole === "employer" && (
                    <Col md={12}>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCompany"
                      >
                        <Form.Label className="lable_heading">
                          Company
                        </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter company"
                          name="compname"
                          className="input_singin"
                          value={formik.values.compname}
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          isInvalid={
                            formik.touched.compname && !!formik.errors.compname
                          }
                        />
                        <Form.Control.Feedback type="invalid">
                          {formik.errors.compname}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  )}
                </Row>



                <div className="button_all pb-3">
                  <Button
                    type="submit"
                    className="button_type_job"
                    onClick={formik.handleSubmit}
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

export default Signup;