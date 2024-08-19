import { useContext, useEffect, useState } from 'react';
import { Button, Col, Form, FormGroup, FormLabel, Modal, Row } from 'react-bootstrap';
import { WorkoutContext } from '../state/WorkoutContext';
import ExercisePicker from '../../ExercisePicker/ExercisePicker';
import { Exercise, equipmentType, muscleGroup } from '../../../models/Exercise';
import { camelCaseToSentenceCase } from '../../../common/utilities/stringUtilities';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

interface ExerciseUpdateProps {
  exercise: Exercise;
}

const EditExerciseModal = () => {
  const { state, editExerciseModalOpen, setEditExerciseModalOpen, onUpdateRoundExercise } = useContext(WorkoutContext);

  const { activeRound } = state;

  const ExerciseUpdate = (props: ExerciseUpdateProps): JSX.Element => {
    const [selectedExercise, setSelectedExercise] = useState(props.exercise);
    const [updated, setUpdated] = useState(false);

    const handleChangeExercise = (val: any) => {
      setSelectedExercise(val);
    };

    useEffect(() => {
      if (selectedExercise != props.exercise) {
        setUpdated(true);
      }
    }, [selectedExercise])

    return (
      <Row>
        <div className='d-flex justify-content-between w-100 mx-auto my-2 align-items-end' style={{columnGap: '20px'}}>
          <Col>
            <FormGroup>
              <FormLabel>Exercises</FormLabel>
              <ExercisePicker
                isMulti={false}
                selectedExercise={selectedExercise}
                onChange={handleChangeExercise}
              ></ExercisePicker>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <FormLabel>Equipment</FormLabel>
              <Form.Select
                aria-label='Equipment Select'
                onChange={(e) => setSelectedExercise({ ...selectedExercise, equipment: equipmentType[e.target.value] })}
                value={equipmentType[selectedExercise.equipment]}
              >
                {Object.values(equipmentType).map((v) => (
                  <option value={v}>{camelCaseToSentenceCase(v)}</option>
                ))}
              </Form.Select>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <FormLabel>Muscle Group</FormLabel>
              <Form.Select
                aria-label='Muscle Group Select'
                onChange={(e) => setSelectedExercise({ ...selectedExercise, muscleGroup: muscleGroup[e.target.value] })}
                value={muscleGroup[selectedExercise.muscleGroup]}
              >
                {Object.values(muscleGroup).map((v) => (
                  <option value={v}>{camelCaseToSentenceCase(v)}</option>
                ))}
              </Form.Select>
            </FormGroup>
          </Col>
          <Col xs={1}>
          <FormGroup>
            <FormLabel></FormLabel>
            {updated && <Button
              onClick={() => onUpdateRoundExercise(props.exercise, selectedExercise)}
              variant='outline-secondary'
              size='sm'
            >
              <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
            </Button>}
          </FormGroup>
          </Col>
        </div>
      </Row>
    );
  };

  return (
    <Modal size={'lg'} show={editExerciseModalOpen} onHide={() => setEditExerciseModalOpen(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Update Exercise/s</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {activeRound?.setList[0].map((set) => (
          <ExerciseUpdate exercise={set.exercise}></ExerciseUpdate>
        ))}
      </Modal.Body>
    </Modal>
  );
};

export default EditExerciseModal;
