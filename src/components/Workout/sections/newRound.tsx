import { Button, Col, Container, Modal, Row } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { Exercise } from '../../../models/Exercise';
import ExercisePicker from '../../ExercisePicker/ExercisePicker';
import Card from '../../Card/Card';
import NewExerciseModal from '../../NewExerciseModal';

type Props = {
  onAddRound: (newExercises: Exercise[]) => void;
  exercises: Exercise[];
};

const NewRound = (props: Props) => {
  const { onAddRound, exercises } = props;
  const [newExerciseModalOpen, setNewExerciseModalOpen] = useState(false);
  const [exerciseOptions, setExerciseOptions] = useState<Exercise[]>([]);
  const [selectedExercise, setSelectedExercise] = useState<Exercise[] | undefined>(undefined);

  const onUpdateExercise = (newExercise: Exercise[]) => {
    setSelectedExercise(newExercise);
  };

  useEffect(() => {
    // setIsLoading(true);
    //TODO Refactor fetch into exercise client

    if (exerciseOptions.length > 0) return;
    fetch('/data/exerciseOptions.json', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setExerciseOptions(response);
      });

    // setIsLoading(false);
  }, []);

  const onStartRound = () => {
    if (!selectedExercise || selectedExercise.length === 0) return;
    onAddRound(selectedExercise);
    console.log(selectedExercise);
  };

  return (
    <Card className='new-round'>
      <Container className='p-4 fw-medium text-center'>
        <Row>
          <Col className='mb-2'>
            <h5 className='fw-bold text-start'>{'Select Exercises'}</h5>
            <ExercisePicker
              selectedExercise={selectedExercise}
              suggestions={exercises}
              onChange={onUpdateExercise}
            ></ExercisePicker>
            <div className='d-flex justify-content-between'>
              <Button variant='outline-secondary' className='mt-2' onClick={() => setNewExerciseModalOpen(true)}>
                Add Exercise
              </Button>
              <Button variant='outline-secondary' className='mt-2' onClick={() => onStartRound()}>
                Start round
              </Button>
            </div>
          </Col>
        </Row>
        <NewExerciseModal setExerciseModalOpen={setNewExerciseModalOpen} exerciseModalOpen={newExerciseModalOpen} />
      </Container>
    </Card>
  );
};

export default NewRound;
