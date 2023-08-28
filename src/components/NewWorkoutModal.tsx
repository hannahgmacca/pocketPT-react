import { useState } from "react";
import { Button, Modal } from "react-bootstrap";

const NewWorkoutModal = () => {
  const [workoutModalOpen, setWorkoutModalOpen] = useState(false);

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
    <Modal
      show={workoutModalOpen}
      onHide={() => setWorkoutModalOpen(false)}
      centered
    >
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Start a new workout</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Pick a workout type</p>
        </Modal.Body>

        <Button onClick={() => handleStartWorkout(1)} variant="secondary">
          Strength
        </Button>
        <Button onClick={() => handleStartWorkout(2)} variant="secondary">
          Strength
        </Button>
      </Modal.Dialog>
      <Button onClick={() => setWorkoutModalOpen(false)} variant="secondary">
        Close
      </Button>
    </Modal>
  );
};

export default NewWorkoutModal;
