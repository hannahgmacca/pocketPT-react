import { useState } from "react";
import { Col, Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faCirclePlus,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import NewWorkoutModal from "./NewWorkoutModal";

const BottomNavigation = () => {
  const [workoutModalOpen, setWorkoutModalOpen] = useState(false);
  const background = "#3580FF";

  const handleStartWorkout = (workoutType: number) => {
    switch (workoutType) {
      case 1:
        // post to api to initiate new workout
        // if success, navigate to /workout
        return;
      case 2:
        // post to api to initiate new workout
        // if success, navigate to /workout
        return;
    }
  };

  return (
    <Navbar fixed="bottom" style={{ background: "#0a0c16" }}>
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
          <button
            className="bg-transparent border-0"
            onClick={() => setWorkoutModalOpen(true)}
          >
            <FontAwesomeIcon
              className="bg-white rounded-5"
              size="4x"
              icon={faCirclePlus}
              style={{ color: background, border: `${background} 1px solid` }}
            />
          </button>
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
      <NewWorkoutModal
        workoutModalOpen={workoutModalOpen}
        setWorkoutModalOpen={setWorkoutModalOpen}
      ></NewWorkoutModal>
    </Navbar>
  );
};

export default BottomNavigation;
