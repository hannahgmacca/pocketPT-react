import React, { PropsWithChildren, useEffect } from "react";
import { Workout, WorkoutShort } from "../../models/Workout";
import { Container, Row } from "react-bootstrap";
import WorkoutListItem from "./sections/WorkoutListItem";
import "./workout-list.scss";
type Props = {
  title: string;
  workoutList: WorkoutShort[];
};
const WorkoutList = (props: PropsWithChildren<Props>) => {
  const { title, workoutList } = props;

  return (
    <div>
      <Row>
        <h4 className="mb-3">{title}</h4>
      </Row>
      {workoutList &&
        workoutList.map((workout, i) => (
          <WorkoutListItem key={i} workoutItem={workout} />
        ))}
    </div>
  );
};
export default WorkoutList;
