import { Button, Col, Modal, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

type Props = {
  workoutModalOpen: boolean;
  setWorkoutModalOpen: (workoutModalOpen: boolean) => void;
};

const NewWorkoutModal = (props: Props) => {
  const { workoutModalOpen, setWorkoutModalOpen } = props;
  const navigate = useNavigate();

  const handleStartWorkout = (workoutType: number) => {
    setWorkoutModalOpen(false);
    switch (workoutType) {
      case 1:
        navigate(`/workout?workoutType=strength`);
        // post to api to initiate new workout
        // if success, navigate to /workout
        return;
      case 2:
        navigate(`/workout?workoutType=hiit`);
        // post to api to initiate new workout
        // if success, navigate to /workout
        return;
    }
  };

  return (
    <Modal
      show={workoutModalOpen}
      onHide={() => setWorkoutModalOpen(false)}
      centered
    >
      {/* <Modal.Dialog> */}
      <Modal.Header closeButton>
        <Modal.Title>Start a new workout</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>Pick a workout type</p>
        <Row className="justify-content-between">
          <Col xs={6}>
            <Button
              onClick={() => handleStartWorkout(1)}
              variant="primary"
              className="w-100"
            >
              Strength
            </Button>
          </Col>
          <Col xs={6}>
            <Button
              disabled
              onClick={() => handleStartWorkout(2)}
              variant="primary"
              className="w-100"
            >
              HIIT
            </Button>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => setWorkoutModalOpen(false)} variant="dark">
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewWorkoutModal;
