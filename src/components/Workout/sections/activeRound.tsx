import { Button, Col, Container, Row } from 'react-bootstrap';
import { Round, RoundSetType } from '../../../models/Round';
import NumberInput from '../../NumberInput';
import { getCharacterIndex } from '../../../common/utilities/alphabet';
import Card from '../../Card/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy, faX } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { WorkoutContext } from '../state/WorkoutContext';
import RoundHeader from './roundHeader';
import { getIndexedColour } from '../../../common/utilities/colourUtilites';

type Props = {
  activeRound: Round;
};

const ActiveRound = (props: Props) => {
  const { onDeleteRound, onUpdateRepCount, onUpdateWeightValue, onCompleteRound, onAddSet, onDeleteSet, setExerciseHistoryModalOpen } =
    useContext(WorkoutContext);

  const { activeRound } = props;

  return (
    <Card variant='outlined-ribbon' className='ps-3'>
      <Container className='p-4 fw-medium text-center'>
        <Row>
          <RoundHeader isActive={true} round={activeRound}></RoundHeader>

          <Col style={{columnGap: '20px'}} className='d-flex justify-content-end align-items-start'>
            <Button onClick={() => setExerciseHistoryModalOpen(true)} variant='outline-secondary'>
              <FontAwesomeIcon icon={faTrophy}></FontAwesomeIcon>
            </Button>
            <Button onClick={() => onDeleteRound(-1)} variant=''>
              <FontAwesomeIcon icon={faX}></FontAwesomeIcon>
            </Button>
          </Col>
        </Row>

        <Row className='fw-bold'>
          <Col xs={3}></Col>
          <Col xs={4} className='g-0'>
            <span>Reps</span>
          </Col>
          <Col xs={1}></Col>
          <Col xs={3}>
            <span>Kg</span>
          </Col>
        </Row>

        {activeRound.setList.map((set, setIndex) => {
          return (
            <div key={setIndex} className='mb-2'>
              {set.map((setItem, setItemIndex) => {
                return (
                  <Row key={setItemIndex} className='set-row p-1 mb-1'>
                    <Col xs={3}>
                      <span className='white bubble' style={{color: getIndexedColour(setItemIndex)}}>
                        {activeRound.roundSetType === RoundSetType.singleSet
                          ? setIndex + 1
                          : `${setIndex + 1}${getCharacterIndex(setItemIndex)}`}
                      </span>
                    </Col>
                    <Col xs={4}>
                      <NumberInput
                        value={setItem.repCount}
                        onChange={(value?) => onUpdateRepCount(setIndex, setItemIndex, setItem, value)}
                      ></NumberInput>
                    </Col>
                    <Col xs={1} className='d-flex justify-content-center'>
                      <span>x</span>
                    </Col>
                    <Col xs={3}>
                      <NumberInput
                        value={setItem.weightKg}
                        onChange={(value?) => onUpdateWeightValue(setIndex, setItemIndex, setItem, value)}
                      ></NumberInput>
                    </Col>
                    <Col xs={1} className='d-flex justify-content-center'>
                      {!(activeRound.setList.length == 1 && activeRound.setList[0].length == 1) && (
                        <Button onClick={() => onDeleteSet(setIndex, setItemIndex)} size='sm' variant=''>
                          <FontAwesomeIcon icon={faX}></FontAwesomeIcon>
                        </Button>
                      )}
                    </Col>
                  </Row>
                );
              })}
            </div>
          );
        })}
        <Row className='mt-4'>
          <Col>
            <Button variant='outline-secondary' onClick={() => onAddSet()}>
              Add Set
            </Button>
          </Col>
          <Col></Col>
          <Col>
            <Button variant='outline-secondary' onClick={() => onCompleteRound()}>
              Finish Round
            </Button>
          </Col>
        </Row>
      </Container>
    </Card>
  );
};

export default ActiveRound;
