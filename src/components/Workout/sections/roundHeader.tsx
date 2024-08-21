import { Button, Col, ToggleButton } from 'react-bootstrap';
import { Round, RoundSetType } from '../../../models/Round';
import { getCharacterIndex } from '../../../common/utilities/alphabet';
import { useContext } from 'react';
import { WorkoutContext } from '../state/WorkoutContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { getIndexedColour } from '../../../common/utilities/colourUtilites';

type Props = {
  round: Round;
  isActive?: boolean;
};

const RoundHeader = (props: Props) => {
  const { onUpdateRoundExercise, setEditExerciseModalOpen } = useContext(WorkoutContext);
  const { round, isActive } = props;
  const isSingleSet = round.roundSetType === RoundSetType.singleSet;

  const getRoundTitle = () => {
    return isSingleSet ? round.setList[0][0].exercise.exerciseName : round.roundSetType;
  };

  const getMultiSetExercises = () => {
    return (
      !isSingleSet && (
        <p>
          {round.setList[0].map((setGroup, setGroupIndex) => {
            return (
              <span key={setGroupIndex} style={{color: getIndexedColour(setGroupIndex)}}>
                {`${getCharacterIndex(setGroupIndex)}. ${setGroup.exercise.exerciseName} `}
                <EachSideToggle exercise={setGroup.exercise} />
                <br></br>
              </span>
            );
          })}
        </p>
      )
    );
  };

  const EachSideToggle = ({ exercise }) => {
    const handleToggle = () => {
      onUpdateRoundExercise(exercise, { ...exercise, isEachSide: !exercise.isEachSide });
    };

    return (
      <ToggleButton
        type='checkbox'
        variant='outline-dark'
        onClick={(event) => handleToggle()}
        value={exercise._id}
        checked={exercise.isEachSide}
        className='ms-2'
        size='sm'
      >
        E/S
      </ToggleButton>
    );
  };

  return (
    <Col className='text-start text-capitalize mb-2'>
      <h5 className='fw-bold text-start text-capitalize'>
        {getRoundTitle()} {isSingleSet && <EachSideToggle exercise={round.setList[0][0].exercise} />}{' '}
        { isActive && <Button variant='outline-secondary' size='sm' onClick={() => setEditExerciseModalOpen(true)}>
          <FontAwesomeIcon icon={faPencil} />
        </Button> }
      </h5>
      <small>{isSingleSet && round.setList[0][0].exercise.equipment}</small>
      {/* <EquipmentPicker
        selectedEquipment={round.setList[0][0].exercise.equipment}
        onChange={(equipment) => handleEquipmentSelect(round.setList[0][0].exercise, equipment)}
      /> */}

      {getMultiSetExercises()}
    </Col>
  );
};

export default RoundHeader;
