import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Round, RoundSetType } from "../../../models/Round";
import NumberInput from "../../NumberInput";
import { Set } from "../../../models/Set";
import { getCharacterIndex } from "../../../common/scss/utilities/alphabet";

type Props = {
  activeRound: Round;
  onUpdateRepCount: (
    setIndex: number,
    setItemIndex: number,
    set: Set,
    newRepCount: number | undefined
  ) => void;
  onUpdateWeightValue: (
    setIndex: number,
    setItemIndex: number,
    set: Set,
    newWeightValue: number | undefined
  ) => void;
  onCompleteRound: () => void;
  onAddSet: () => void;
};

const ActiveRound = (props: Props) => {
  const {
    activeRound,
    onUpdateRepCount,
    onUpdateWeightValue,
    onCompleteRound,
    onAddSet,
  } = props;

  return (
    <Card className="active-round">
      <Container className="p-4 fw-medium text-center">
        <Row>
          <Col className="fw-bold text-start text-capitalize">
            <h5 className="fw-bold text-start text-capitalize">
              {activeRound.roundSetType === RoundSetType.singleSet
                ? activeRound.setList[0][0].exercise.exerciseName
                : activeRound.roundSetType}
            </h5>
            {!(activeRound.roundSetType === RoundSetType.singleSet) && (
              <p>
                {activeRound.setList[0].map((setGroup, setGroupIndex) => {
                  return (
                    <span key={setGroupIndex}>
                      {`${getCharacterIndex(setGroupIndex)}. ${
                        setGroup.exercise.exerciseName
                      } `}
                      <br></br>
                    </span>
                  );
                })}
              </p>
            )}
          </Col>
          {/* TODO */}
          <Col className="d-flex justify-content-end">
            {/* TODO NAVIGATE TO EXERCISE HISTORY */}
            {/* <Button onClick={() => {}}>History </Button> */}
          </Col>
        </Row>

        <Row className="text-black fw-bold">
          <Col xs={2}></Col>
          <Col xs={2} className="g-0">
            <span>Reps</span>
          </Col>
          <Col xs={1}></Col>
          <Col xs={3}>
            <span>Kg</span>
          </Col>
          <Col xs={4}>
            <span>Previous</span>
          </Col>
        </Row>

        {activeRound.setList.map((set, setIndex) => {
          return (
            <div key={setIndex}>
              {set.map((setItem, setItemIndex) => {
                return (
                  <Row
                    key={setItemIndex}
                    className="set-row p-1 mb-1 text-black"
                  >
                    <Col xs={2}>
                      <span className="white bubble">
                        {activeRound.roundSetType === RoundSetType.singleSet
                          ? setIndex + 1
                          : `${setIndex + 1}${getCharacterIndex(setItemIndex)}`}
                      </span>
                    </Col>
                    <Col xs={2}>
                      <NumberInput
                        value={setItem.repCount}
                        onChange={(value?) =>
                          onUpdateRepCount(
                            setIndex,
                            setItemIndex,
                            setItem,
                            value
                          )
                        }
                      ></NumberInput>
                    </Col>
                    <Col xs={1}>
                      <span>x</span>
                    </Col>
                    <Col xs={3}>
                      <NumberInput
                        value={setItem.weightKg}
                        onChange={(value?) =>
                          onUpdateWeightValue(
                            setIndex,
                            setItemIndex,
                            setItem,
                            value
                          )
                        }
                      ></NumberInput>
                    </Col>
                    <Col xs={4} className="text-white">
                      10 x 40kg
                    </Col>
                  </Row>
                );
              })}
            </div>
          );
        })}
        <Row>
          <Col>
            <Button onClick={() => onAddSet()}>Add Set</Button>
          </Col>
          <Col></Col>
          <Col>
            <Button onClick={() => onCompleteRound()}>Finish Round</Button>
          </Col>
        </Row>
      </Container>
    </Card>
  );
};

export default ActiveRound;
