import { useContext } from 'react';
import { Button, Col, Modal, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AppContext } from '../state/AppContext';
import APIClient from '../apis/APIClient';
import WorkoutAPI from '../apis/WorkoutAPI';
import { initialWorkoutState } from '../state/workout/workoutReducer';
import { WorkoutType } from '../models/Workout';

type Props = {
  workoutModalOpen: boolean;
  setWorkoutModalOpen: (workoutModalOpen: boolean) => void;
};

const NewWorkoutModal = (props: Props) => {
  const { workoutModalOpen, setWorkoutModalOpen } = props;

  const navigate = useNavigate();

  const apiClient = new APIClient();
  const workoutClient = new WorkoutAPI(apiClient);

  const handleStartWorkout = async (workoutType: number) => {
    setWorkoutModalOpen(false);
    const intialWorkout = initialWorkoutState;

    switch (workoutType) {
      case 1:
        intialWorkout.workoutType = WorkoutType.strength;
        break;
      case 2:
        intialWorkout.workoutType = WorkoutType.cardio;
        break;
    }

    const newWorkout = await workoutClient.addWorkout(intialWorkout);
    navigate(`/workout/${newWorkout._id}`);
  };

  return (
    <Modal
      show={workoutModalOpen}
      onHide={() => setWorkoutModalOpen(false)}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Start a new workout</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>Pick a workout type</p>
            <Button
              onClick={async () => await handleStartWorkout(1)}
              variant="primary"
              className='me-2'
            >
              Strength
            </Button>
            <Button
              disabled
              onClick={async () => await handleStartWorkout(2)}
              variant="primary"
            >
              HIIT
            </Button>
      </Modal.Body>
    </Modal>
  );
};

export default NewWorkoutModal;
