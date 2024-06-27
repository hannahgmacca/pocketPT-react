import { useState } from 'react';
import { Button, Col, FormControl, FormGroup, FormLabel, Modal, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

type Props = {
  exerciseModalOpen: boolean;
  setExerciseModalOpen: (workoutModalOpen: boolean) => void;
};

class NewExerciseInput {
  exerciseName: string = '';
  defaultWeightKg: number = 0;
  defaultRepCount: number = 0;
}

const NewExerciseModal = (props: Props) => {
  const { exerciseModalOpen, setExerciseModalOpen } = props;
  const [exercise, setExercise] = useState<NewExerciseInput>(new NewExerciseInput());

  const handleAddWorkout = () => {
    if (!exercise.exerciseName) return;
    setExerciseModalOpen(false);
  };

  return (
    <Modal show={exerciseModalOpen} onHide={() => setExerciseModalOpen(false)} centered>
      {/* <Modal.Dialog> */}
      <Modal.Header closeButton>
        <Modal.Title>Add an exercise</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <FormGroup>
          <FormLabel>Exercise Name </FormLabel>
          <FormControl
            type='text'
            placeholder='Barbell lunge'
            value={exercise.exerciseName}
            className='mb-3'
            onChange={(e) => setExercise({ ...exercise, exerciseName: e.target.value })}
            required
          ></FormControl>
        </FormGroup>

        <div className='d-flex justify-between'>
          <FormGroup>
            <FormLabel>Default Weight</FormLabel>
            <FormControl
              type='number'
              placeholder={'60'}
              value={exercise.defaultWeightKg}
              className='mb-3'
              step='5'
              onChange={(e) => setExercise({ ...exercise, defaultWeightKg: parseFloat(e.target.value) })}
            ></FormControl>
          </FormGroup>

          <FormGroup>
            <FormLabel>Default Rep Count</FormLabel>
            <FormControl
              type='number'
              placeholder={'60'}
              value={exercise.defaultRepCount}
              className='mb-3'
              step='5'
              onChange={(e) => setExercise({ ...exercise, defaultRepCount: parseFloat(e.target.value) })}
            ></FormControl>
          </FormGroup>
        </div>

        <Button onClick={() => handleAddWorkout()} variant='outline-primary' className='me-2'>
          Strength
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default NewExerciseModal;
