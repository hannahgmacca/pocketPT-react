import { useContext, useState } from 'react';
import { Button, Form, FormControl, FormGroup, FormLabel, Modal, Row } from 'react-bootstrap';
import { Exercise, equipmentType, initalExercise, muscleGroup } from '../models/Exercise';
import { camelCaseToSentenceCase } from '../common/utilities/stringUtilities';
import { WorkoutContext } from './Workout/state/WorkoutContext';

const NewExerciseModal = () => {
  const { newExerciseModalOpen, setNewExerciseModalOpen, handleAddExercise } = useContext(WorkoutContext);
  const [exercise, setExercise] = useState<Exercise>(initalExercise);

  return (
    <Modal show={newExerciseModalOpen} onHide={() => setNewExerciseModalOpen(false)} centered>
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

        <div className='d-flex justify-content-center w-100'>
          <FormGroup>
            <FormLabel>Equipment</FormLabel>
            <Form.Select
              aria-label='Equipment Select'
              onChange={(e) => setExercise({ ...exercise, equipment: equipmentType[e.target.value] })}
            >
              {Object.values(equipmentType).map((v) => (
                <option value={v}>{camelCaseToSentenceCase(v)}</option>
              ))}
            </Form.Select>
          </FormGroup>

          <FormGroup>
            <FormLabel>Muscle Group</FormLabel>
            <Form.Select
              aria-label='Muscle Group Select'
              onChange={(e) => setExercise({ ...exercise, muscleGroup: muscleGroup[e.target.value] })}
            >
              {Object.values(muscleGroup).map((v) => (
                <option value={v}>{camelCaseToSentenceCase(v)}</option>
              ))}
            </Form.Select>
          </FormGroup>
        </div>

        <Button onClick={() => handleAddExercise(exercise)} variant='outline-primary' className='me-2'>
          Add
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default NewExerciseModal;
