import { Button, Col, Container, Row } from 'react-bootstrap';
import { Round, RoundSetType } from '../../../models/Round';
import Card from '../../Card/Card';
import { getCharacterIndex } from '../../../common/scss/utilities/alphabet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import NumberInput from '../../NumberInput';

type Props = {
  index: number;
  round: Round;
  onEditRound: (roundIndex: number) => void;
};

const PreviousRound = (props: Props) => {
  const { index, round, onEditRound } = props;
  return (
    <Card className={`complete-round ps-3 ${index % 2 === 0 && 'odd'}`}>
      <Container className='p-4 fw-medium text-center'>
        <Row>
          <Col className='text-start text-capitalize'>
            <h5 className='fw-bold text-start text-capitalize'>
              {round.roundSetType === RoundSetType.singleSet
                ? round.setList[0][0].exercise.exerciseName
                : round.roundSetType}
            </h5>

            {!(round.roundSetType === RoundSetType.singleSet) && (
              <p>
                {round.setList[0].map((setGroup, setGroupIndex) => {
                  return (
                    <span key={setGroupIndex}>
                      {`${getCharacterIndex(index)}. ${setGroup.exercise.exerciseName} `}
                      <br></br>
                    </span>
                  );
                })}
              </p>
            )}
          </Col>
          <Col className='d-flex justify-content-end'>
            <div>
              <Button variant='outline-secondary' onClick={() => onEditRound(index)}>
                <FontAwesomeIcon icon={faEdit} />
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
                      <Row key={setItemIndex} className='p-1'>
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
