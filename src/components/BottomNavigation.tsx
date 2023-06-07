import React from "react";
import { Col, Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faCirclePlus,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const BottomNavigation: React.FC = () => {
  const background = "#3580FF";
  return (
    <Navbar bg="dark" fixed="bottom">
      <Container fluid className="justify-content-between">
        <Col className="d-flex justify-content-center" xs={3}>
          <Link to="/">
            <FontAwesomeIcon
              size="2x"
              icon={faHouse}
              style={{ color: background }}
            />
          </Link>
        </Col>
        <Col className="d-flex justify-content-center" xs={3}>
          <Link to="workout">
            <FontAwesomeIcon
              className="bg-white rounded-5"
              size="4x"
              icon={faCirclePlus}
              style={{ color: background }}
            />
          </Link>
        </Col>
        <Col className="d-flex justify-content-center" xs={3}>
          <Link to="profile">
            <FontAwesomeIcon
              size="2x"
              icon={faUser}
              style={{ color: background }}
            />
          </Link>
        </Col>
      </Container>
    </Navbar>
  );
};

export default BottomNavigation;
