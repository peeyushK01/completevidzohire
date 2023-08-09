import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Try from "./Try";

const Fectch = (props) => {
  const navigate = useNavigate();
  const [data, setData] = useState();

  const addJob = () => {
    navigate("/hrprofile");
  };

  function deleteJob(id) {
    fetch(`/api/delete-job/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((result) => {
        if (!result.ok) {
          throw new Error("Failed to delete job");
        }
        setData(data.filter((job) => job._id !== id));
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <>
      <section className="banner_hr">
        <p>
          lorem1 sjdsd sdsdkl sdskldns ddsdn saskdn sdasn sds sjdsm as jsdsdj
          asm asjasn j sj as asasn xasnbas{" "}
        </p>
      </section>

      <div className="btn_text py-3">
        <Container>
          <Row>
            <Col md={6}>
              <div className="text_banner">
                <h3>
                  Employer <span className="dashhr">Dashboard</span>{" "}
                </h3>
              </div>
            </Col>
            <Col md={6}>
              <div className="btn_add">
                <Button
                  as="a"
                  className="ml-3 logout_btn"
                  onClick={() => addJob()}
                >
                  Add Button
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <section className="table_numer py-5">
        <Container fluid>
          <Row>
            <Col md={12}>
              <Try />
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Fectch;
