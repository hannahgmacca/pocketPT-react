import React from "react";
import { Col, Container, Navbar, Row } from "react-bootstrap";
import { faBars, faBell } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getToday, getWeekdayDate } from "../common/scss/utilities/dates";

const TopNavigation: React.FC = () => {
  const today = getToday();
  return (
    <Navbar className="mt-2">
      <Container fluid>
        {/* <Row xs={12}> */}
        <Col xs={2} className="d-flex justify-content-center">
          <Link to="/">
            <FontAwesomeIcon size="2x" icon={faBars} />
          </Link>
        </Col>
        <Col xs={8} className="d-flex justify-content-center">
          <span className="fw-bold fs-3">{getWeekdayDate(today)}</span>
        </Col>
        <Col xs={2} className="d-flex justify-content-center">
          <Link to="/">
            <FontAwesomeIcon size="2x" icon={faBell} />
          </Link>
        </Col>
        {/* </Row> */}
      </Container>
    </Navbar>
  );
};

export default TopNavigation;
