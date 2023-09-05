import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Round } from "../../../models/Round";
import NumberInput from "../../NumberInput";
import { Set } from "../../../models/Set";
import { Exercise } from "../../../models/Exercise";

type Props = {
  activeRound: Round;
  onUpdateRepCount: (
    setIndex: number,
    set: Set,
    newRepCount: number | undefined
  ) => void;
  onUpdateWeightValue: (
    setIndex: number,
    set: Set,
    newWeightValue: number | undefined
  ) => void;
  onCompleteRound: () => void;
  onAddSet: (newExercise: Exercise) => void;
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
          <Col>
            <h5 className="fw-bold text-start text-capitalize">
              {/* { typeof activeRound.setList == 'set'
                ? "Super Set"
                : activeRound.setList[0].exercise.exerciseName} */}
            </h5>
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

        {activeRound.setList.map((set, index) => {
          return (
            <>
              <Row key={index} className="set-row p-1 mb-1 text-black">
                <Col xs={2}>
                  <span className="white bubble">{index + 1}</span>
                </Col>
                <Col xs={2}>
                  <NumberInput
                    value={set.repCount}
                    onChange={(value?) => onUpdateRepCount(index, set, value)}
                  ></NumberInput>
                </Col>
                <Col xs={1}>
                  <span>x</span>
                </Col>
                <Col xs={3}>
                  <NumberInput
                    value={set.weightKg}
                    onChange={(value?) =>
                      onUpdateWeightValue(index, set, value)
                    }
                  ></NumberInput>
                </Col>
                <Col xs={4} className="text-white">
                  10 x 40kg
                </Col>
              </Row>
            </>
          );
        })}
        <Row>
          <Col>
            <Button onClick={() => onAddSet}>Add Set</Button>
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
