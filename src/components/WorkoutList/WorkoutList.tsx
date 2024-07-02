import { PropsWithChildren } from "react";
import { WorkoutShort } from "../../models/Workout";
import { Container, Row } from "react-bootstrap";
import WorkoutListItem from "./sections/WorkoutListItem";
import "./workout-list.scss";

type Props = {
  title: string;
  workoutList: WorkoutShort[];
  handleDelete: (_workoutId: string) => void;
};
const WorkoutList = (props: PropsWithChildren<Props>) => {
  const { title, workoutList, handleDelete } = props;

  return (
    <Container className='gx-0'>
      <Row>
        <h4 className="mb-3">{title}</h4>
      </Row>
      {workoutList &&
        workoutList.map((workout, i) => (
          <WorkoutListItem key={i} workoutItem={workout} handleDelete={handleDelete}/>
        ))}
    </Container>
  );
};
export default WorkoutList;
