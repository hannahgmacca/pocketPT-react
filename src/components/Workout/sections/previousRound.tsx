import { Button, Col, Container, Row } from 'react-bootstrap';
import { Round, RoundSetType } from '../../../models/Round';
import Card from '../../Card/Card';
import { getCharacterIndex } from '../../../common/utilities/alphabet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import NumberInput from '../../NumberInput';
import { faX } from '@fortawesome/free-solid-svg-icons';
import RoundHeader from './roundHeader';
import { useContext } from 'react';
import { WorkoutContext } from '../../../state/workout/WorkoutContext';

type Props = {
  index: number;
  round: Round;
};

const PreviousRound = (props: Props) => {
  const { index, round } = props;
  const {onEditRound, onDeleteRound} = useContext(WorkoutContext);
  
  return (
    <Card className={`complete-round ps-3 ${index % 2 === 0 && 'odd'}`}>
      <Container className='p-4 fw-medium text-center'>
        <Row>
          <RoundHeader round={round}/>
          <Col className='d-flex justify-content-end'>
            <div>
              <Button variant='outline-secondary' onClick={() => onEditRound(index)}>
                <FontAwesomeIcon icon={faEdit} />
              </Button>
              <Button onClick={() => onDeleteRound(index)} variant=''>
                <FontAwesomeIcon icon={faX}></FontAwesomeIcon>
              </Button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={11}>
            {round.setList.map((set, setIndex) => {
              return (
                <div key={setIndex}>
                  {set.map((setItem, setItemIndex) => {
                    return (
                      <Row key={setItemIndex} className='set-row p-1'>
                        <Col xs={2}>
                          <span className='white bubble'>
                            {round.roundSetType === RoundSetType.singleSet
                              ? setIndex + 1
                              : `${setIndex + 1}${getCharacterIndex(setItemIndex)}`}
                          </span>
                        </Col>
                        <Col xs={4}>
                          <NumberInput value={setItem.repCount} disabled />
                        </Col>
                        <Col xs={1} className='d-flex justify-content-center'>
                          <span>{'x'}</span>
                        </Col>
                        <Col xs={4}>
                          <NumberInput value={setItem.weightKg} disabled />
                        </Col>
                      </Row>
                    );
                  })}
                </div>
              );
            })}
          </Col>
        </Row>
      </Container>
    </Card>
  );
};

export default PreviousRound;
