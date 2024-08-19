import { PropsWithChildren } from 'react';
import { WorkoutShort } from '../../../models/Workout';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import Card from '../../Card/Card';

type Props = {
  workoutItem: WorkoutShort;
  handleDelete: (_workoutId: string) => void;
};

const WorkoutListItem = (props: PropsWithChildren<Props>) => {
  const { workoutItem, handleDelete } = props;
  const navigate = useNavigate();


  const onWorkoutView = () => {
    navigate(`/workout/${workoutItem._id}`)
  }

  return (
    <Card variant='outlined' className='workout-item mb-3'>
      <Row className='py-1'>
        <Col className='ps-4 pt-2 pb-2' xs={7}>
          <Row>
            <span className='workout-type'>{workoutItem.workoutType}</span>
          </Row>
          <Row>
            <span>{workoutItem.workoutName}</span>
          </Row>
          <Row>
            <span className='workout-time-since'>{moment(workoutItem.completedDateTime).fromNow()}</span>
          </Row>
        </Col>

        <Col className='d-flex justify-content-end'>
          <div className='d-flex'>
          <Button onClick={onWorkoutView} variant='outline-secondary' className='m-auto'>View</Button>
          </div>
          {/* <Col xs={2} className='d-flex justify-content-center'> */}
          <Button onClick={() => handleDelete(workoutItem._id)} variant=''>
            <FontAwesomeIcon icon={faX}></FontAwesomeIcon>
          </Button>
        </Col>
        {/* </Col> */}
      </Row>
    </Card>
  );
};

export default WorkoutListItem;
