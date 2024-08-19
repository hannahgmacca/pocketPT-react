import {
  Button,
  Col,
  Container,
  FormGroup,
  FormLabel,
  Row,
  ToggleButton,
  ToggleButtonGroup,
} from 'react-bootstrap';
import { useContext, useState } from 'react';
import { Exercise, equipmentType } from '../../../models/Exercise';
import ExercisePicker from '../../ExercisePicker/ExercisePicker';
import Card from '../../Card/Card';
import NewExerciseModal from '../../NewExerciseModal';
import { WorkoutContext } from '../state/WorkoutContext';

const NewRound = () => {
  const { onAddRound, exercises, exerciseFilters, setExerciseFilters, setNewExerciseModalOpen } = useContext(WorkoutContext);
  const [selectedExercise, setSelectedExercise] = useState<Exercise[] | undefined>(undefined);

  const [filteredExercises, setFilteredExercises] = useState(exercises);

  const filterMapping = {
    1: { equipment: 'barbell' },
    2: { equipment: 'dumbell' },
    3: { equipment: 'machine' },
    4: { equipment: 'stretchBand' },
    5: { muscleGroups: ['bicep', 'tricep', 'chest', 'back', 'shoulders', 'forearms', 'traps', 'lats', 'obliques'] }, // upper body
    6: { muscleGroups: ['chest', 'tricep', 'shoulders'] }, // upper push
    7: { muscleGroups: ['back', 'bicep', 'forearms', 'traps', 'lats'] }, // upper pull
    8: { muscleGroups: ['quadriceps', 'hamstrings', 'calves', 'glutes'] }, // lower body
    9: { muscleGroups: ['quadriceps', 'calves'] }, // lower push
    10: { muscleGroups: ['hamstrings', 'glutes'] } // lower pull
  };

  const onUpdateExercise = (newExercise: Exercise[]) => {
    setSelectedExercise(newExercise);
  };

  const onStartRound = () => {
    if (!selectedExercise || selectedExercise.length === 0) return;
    onAddRound(selectedExercise);
  };

  const onExerciseFilterSelect = (val: number[]) => {
    setExerciseFilters(val);

    if (val.length === 0) {
      setFilteredExercises(exercises);
      return;
    }

    const result = exercises.filter((exercise) => {
      let matchesEquipment = false;
      let matchesMuscleGroup = false;
  
      for (const filter of val) {
        const filterCriteria = filterMapping[filter];
        if ((filterCriteria.equipment && exercise.equipment === filterCriteria.equipment) || exercise.equipment === equipmentType.none) {
          matchesEquipment = true;
        }
        if (filterCriteria.muscleGroups && filterCriteria.muscleGroups.includes(exercise.muscleGroup)) {
          matchesMuscleGroup = true;
        }
      }

      const noEquipmentSelected = !val.some(v => [1, 2, 3, 4].includes(v));  
      const noMuscleGroupSelected = !val.some(v => [5, 6, 7, 8, 9, 10].includes(v));  

      return (noEquipmentSelected || matchesEquipment) && (noMuscleGroupSelected || matchesMuscleGroup);
    });

    setFilteredExercises(result);

  };

  return (
    <Card variant='outlined-ribbon'>
      <Container className='p-4 fw-medium text-center'>
        <Row>
          <Col className='mb-2'>
            <h6 className='fw-bold text-start mb-4'>{'Select Exercises'}</h6>
            <FormGroup className='d-flex flex-column justify-content-start'>
              <Row className='mb-2'>
                <FormLabel className='pe-3 text-start'>Available Equipment</FormLabel>
                <ToggleButtonGroup type='checkbox' value={exerciseFilters} onChange={onExerciseFilterSelect}>
                  <ToggleButton variant='outline-secondary' size='sm' id='barbell-checkbox' value={1}>
                    Barbell
                  </ToggleButton>
                  <ToggleButton variant='outline-secondary' size='sm' id='dumbell-checkbox' value={2}>
                    Dumbell
                  </ToggleButton>
                  <ToggleButton variant='outline-secondary' size='sm' id='machine-checkbox' value={3}>
                    Machine
                  </ToggleButton>
                  <ToggleButton variant='outline-secondary' size='sm' id='band-checkbox' value={4}>
                    Band
                  </ToggleButton>
                </ToggleButtonGroup>
              </Row>

              <Row className='mb-2'>
                <FormLabel className='pe-3 text-start'>Target Areas - Upper</FormLabel>
                <ToggleButtonGroup type='checkbox' value={exerciseFilters} onChange={onExerciseFilterSelect}>
                  <ToggleButton variant='outline-secondary' size='sm' id='upper-checkbox' value={5}>
                    Upper
                  </ToggleButton>
                  <ToggleButton variant='outline-secondary' size='sm' id='upperpush-checkbox' value={6}>
                    Push
                  </ToggleButton>
                  <ToggleButton variant='outline-secondary' size='sm' id='upperpull-checkbox' value={7}>
                    Pull
                  </ToggleButton>
                </ToggleButtonGroup>
              </Row>

              <Row className='mb-4'>
                <FormLabel className='pe-3 text-start'>Target Areas - Lower</FormLabel>
                <ToggleButtonGroup type='checkbox' value={exerciseFilters} onChange={onExerciseFilterSelect}>
                  <ToggleButton variant='outline-secondary' size='sm' id='lower-checkbox' value={8}>
                    Lower
                  </ToggleButton>
                  <ToggleButton variant='outline-secondary' size='sm' id='lowerpush-checkbox' value={9}>
                    Push
                  </ToggleButton>
                  <ToggleButton variant='outline-secondary' size='sm' id='lowerpull-checkbox' value={10}>
                    Pull
                  </ToggleButton>
                </ToggleButtonGroup>
              </Row>
            </FormGroup>

            
            <ExercisePicker
              isMulti
              selectedExercise={selectedExercise}
              onChange={onUpdateExercise}
            ></ExercisePicker>
            <div className='d-flex justify-content-between'>
              <Button variant='outline-secondary' className='mt-2' onClick={() => setNewExerciseModalOpen(true)}>
                New Exercise
              </Button>
              <Button variant='outline-secondary' className='mt-2' onClick={() => onStartRound()}>
                Start round
              </Button>
            </div>
          </Col>
        </Row>
        <NewExerciseModal />
      </Container>
    </Card>
  );
};

export default NewRound;
