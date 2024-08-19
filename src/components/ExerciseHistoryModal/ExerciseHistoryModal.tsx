import { FormGroup, FormLabel, Modal, ModalHeader, Row, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import { ExerciseHistory } from '../../models/ExerciseHistory';
import { useMemo, useState } from 'react';
import PreviousRound from '../Round/PreviousRound';

interface Props {
  isOpen: boolean;
  setClosed: (_closed: boolean) => void;
  exerciseHistories: Record<string, ExerciseHistory>;
}
const ExerciseHistoryModal = (props: Props) => {
  const { isOpen, exerciseHistories, setClosed } = props;

  const getExerciseIds = useMemo(() => {
    return Object.keys(exerciseHistories);
  }, [exerciseHistories]);

  const [selectedExercise, setSelectedExercise] = useState<string | undefined>(getExerciseIds[0]);
  const [selectedLoadType, setSelectedLoadType] = useState<'volume' | 'weight'>('weight');

  const onExerciseSelect = (val: string) => {
    setSelectedExercise(val);
  };

  // const onLoadTypeSelect = (val: string) => {
  //   setSelectedExercise(val);
  // };

  const getPersonalBestRound = useMemo(() => {
    if (!selectedExercise) return;

    const selectedExerciseHistory = exerciseHistories[selectedExercise];
    if (selectedLoadType == 'weight') {
      return selectedExerciseHistory.personalBestRounds.weightKg;
    } else {
      return selectedExerciseHistory.personalBestRounds.volumeKg;
    }
  }, [selectedLoadType, selectedExercise]);

  const getExerciseHistory = useMemo(() => {
    if (!selectedExercise) return;

    const selectedExerciseHistory = exerciseHistories[selectedExercise];
    return selectedExerciseHistory.roundList;
  }, [selectedExercise]);

  return (
    <Modal show={isOpen} onHide={() => setClosed(false)} centered>
      <ModalHeader>Exercise History</ModalHeader>

      {/* EXERCISES */}
      <FormGroup className='d-flex flex-column justify-content-start'>
        <Row className='mb-2'>
          <FormLabel className='pe-3 text-start'></FormLabel>
          <ToggleButtonGroup type='radio' value={selectedExercise} name='exercise-selector' onChange={onExerciseSelect}>
            {getExerciseIds.map((exerciseId, i) => {
              return (
                <ToggleButton
                  variant='outline-secondary'
                  size='sm'
                  id={`${exerciseId}-exercise-toggle`}
                  value={exerciseId}
                >
                  {exerciseHistories[exerciseId].exercise.exerciseName}
                </ToggleButton>
              );
            })}
          </ToggleButtonGroup>
        </Row>
      </FormGroup>

      {/* LOAD TYPES */}
      <FormGroup className='d-flex flex-column justify-content-start'>
        <Row className='mb-2'>
          <FormLabel className='pe-3 text-start'></FormLabel>
          <ToggleButtonGroup
            type='radio'
            value={selectedLoadType}
            name='load-type-selector'
            onChange={setSelectedLoadType}
          >
            <ToggleButton variant='outline-secondary' size='sm' id={`weight-toggle`} value={'weight'}>
              Weight
            </ToggleButton>

            <ToggleButton variant='outline-secondary' size='sm' id={`volume-toggle`} value={'volume'}>
              Volume
            </ToggleButton>
          </ToggleButtonGroup>
        </Row>
      </FormGroup>

      <Row>
        <h6>Personal best</h6>
        {getPersonalBestRound ? <PreviousRound index={0} round={getPersonalBestRound}></PreviousRound> : <p>There is no personal best for this exercise</p>}
      </Row>
    </Modal>
  );
};

export default ExerciseHistoryModal;
