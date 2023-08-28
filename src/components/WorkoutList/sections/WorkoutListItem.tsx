import React, { PropsWithChildren } from "react";
import { WorkoutShort } from "../../../models/Workout";
import { Col, Container, Row } from "react-bootstrap";
import { getTimeSince } from "../../../common/scss/utilities/dates";
import progressImg from "./calorie-pb.png";

type Props = {
  workoutItem: WorkoutShort;
};

const WorkoutListItem = (props: PropsWithChildren<Props>) => {
  const { workoutItem } = props;

  return (
    <Container className="workout-item mb-3">
      <Row>
        <Col className="ps-4 pt-2 pb-2" xs={9}>
          <Row>
            <span className="workout-type">{workoutItem.workoutType}</span>
          </Row>
          <Row>
            <span>{workoutItem.workoutName}</span>
          </Row>
          <Row>
            <span className="workout-time-since">
              {getTimeSince(workoutItem.completedDateTime)}
            </span>
          </Row>
        </Col>
        <Col xs={3} className="d-flex justify-content-center align-center">
          <img
            height="60px"
            width="65px"
            src={progressImg}
            alt="progress-ring"
            className="d-inline m-auto"
          ></img>
        </Col>
      </Row>
    </Container>
  );
};

export default WorkoutListItem;
