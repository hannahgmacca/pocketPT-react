import { Button, Col, Container, Row } from 'react-bootstrap';
import { Round, RoundSetType } from '../../models/Round';
import Card from '../Card/Card';
import { getCharacterIndex } from '../../common/utilities/alphabet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrophy } from '@fortawesome/free-solid-svg-icons';
import NumberInput from '../NumberInput';
import { faX } from '@fortawesome/free-solid-svg-icons';
import RoundHeader from '../Workout/sections/roundHeader';
import { getIndexedColour } from '../../common/utilities/colourUtilites';

type Props = {
  index: number;
  round: Round;
  onEditRound?: (_roundIndex: number) => void;
  onDeleteRound?: (_roundIndex: number) => void;
};

const PreviousRound = (props: Props) => {
  const { index, round, onEditRound, onDeleteRound } = props;

  return (
    <Card variant='outlined-ribbon' className={`complete-round ps-3 ${index % 2 === 0 && 'odd'}`}>
      <Container className='p-4 fw-medium text-center'>
        <Row>
          <RoundHeader round={round} />
          <Col className='d-flex justify-content-end'>
            <div>
              {onEditRound && (
                <Button variant='outline-secondary' onClick={() => onEditRound(index)}>
                  <FontAwesomeIcon icon={faEdit} />
                </Button>
              )}
              {onDeleteRound && (
                <Button onClick={() => onDeleteRound(index)} variant=''>
                  <FontAwesomeIcon icon={faX}></FontAwesomeIcon>
                </Button>
              )}
            </div>
          </Col>
        </Row>
   
            {round.setList.map((set, setIndex) => {
              return (
                <div key={setIndex} className='mb-3'>
                  {set.map((setItem, setItemIndex) => {
                    return (
                      <Row key={setItemIndex} className='set-row p-1 mb-1' style={{borderColor: getIndexedColour(setItemIndex)}}>
                        <Col xs={3}>
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
                        <Col xs={3}>
                          <NumberInput value={setItem.weightKg} disabled />
                        </Col>
                        <Col xs={1}>
                        { (setItem.isPersonalBest?.volumeKg || setItem.isPersonalBest?.weightKg) && <div className='d-flex justify-content-start'>
                        <FontAwesomeIcon color='yellow' icon={faTrophy}/> 
                        </div>}
                        </Col>
                      </Row>
                    );
                  })}
                </div>
              );
            })}
      
      </Container>
    </Card>
  );
};

export default PreviousRound;
