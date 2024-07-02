import { PropsWithChildren } from "react";
import { WorkoutShort } from "../../../models/Workout";
import { Button, Col, Container, Row } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

type Props = {
  workoutItem: WorkoutShort;
  handleDelete: (_workoutId: string) => void;

};

const WorkoutListItem = (props: PropsWithChildren<Props>) => {
  const { workoutItem, handleDelete } = props;

  return (
    <Container className="workout-item mb-3">
      <Row>
        <Col className="ps-4 pt-2 pb-2" xs={7}>
          <Row>
            <span className="workout-type">{workoutItem.workoutType}</span>
          </Row>
          <Row>
            <span>{workoutItem.workoutName}</span>
          </Row>
          <Row>
            <span className="workout-time-since">
              {moment(workoutItem.completedDateTime).fromNow()}
            </span>
          </Row>
        </Col>
        <Col xs={3} className="d-flex justify-content-center align-center">
          {/* <img
            height="60px"
            width="65px"
            src={progressImg}
            alt="progress-ring"
            className="d-inline m-auto"
          ></img> */}
        </Col>
        <Col xs={2} className='d-flex justify-content-center'>
        <Button onClick={() => handleDelete(workoutItem._id)} variant=''>
          <FontAwesomeIcon icon={faX}></FontAwesomeIcon>
        </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default WorkoutListItem;
