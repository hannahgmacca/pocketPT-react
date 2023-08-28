import React, { useCallback, useEffect, useReducer } from "react";
import WorkoutReducer, { initialWorkoutState } from "./state/workoutReducer";
import { Button, Col, Container, Row } from "react-bootstrap";
import Card from "../Card/Card";
import { Set } from "../../models/Set";
// import { useRouteMatch } from "react-router-dom";
import { WorkoutActions } from "./state/workoutActions";
import "./workout.scss";
import NumberInput from "../NumberInput";
import { Exercise } from "../../models/Exercise";
import ActiveRound from "./sections/activeRound";
import NewRound from "./sections/newRound";

interface RouterParams {
  workoutId: string;
}

const Workout = () => {
  const [state, dispatch] = useReducer(WorkoutReducer, initialWorkoutState);
  const { activeRound, workoutName, completedRoundList, workoutType } = state;

  // const match = useRouteMatch<RouterParams>();

  const onFirstLoad = useCallback(async (workoutId?: string) => {
    // if (!workoutId) {
    try {
      fetch("/data/currentWorkout.json", {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      })
        .then((response) => response.json())
        .then((response) => dispatch(WorkoutActions.setWorkout(response)));

      //setIsLoading(false);
    } catch (err) {
      //handleError(err);
    }
    // } else {
    // }
  }, []);

  useEffect(() => {
    if (!state.workoutId) {
      onFirstLoad();
    }
  }, [onFirstLoad, state.workoutId]);

  const onUpdateRepCount = useCallback(
    (setIndex: number, set: Set, newRepCount: number | undefined) => {
      dispatch(
        WorkoutActions.updateSet({
          setIndex,
          newSet: { ...set, repCount: newRepCount || 0 },
        })
      );
    },
    []
  );

  const onUpdateWeightValue = useCallback(
    (setIndex: number, set: Set, newWeightValue: number | undefined) => {
      dispatch(
        WorkoutActions.updateSet({
          setIndex,
          newSet: { ...set, weightKg: newWeightValue || 0 },
        })
      );
    },
    []
  );

  const onCompleteRound = () => {
    dispatch(WorkoutActions.completeRound());
  };

  const onAddSet = (newExercise: Exercise) => {
    dispatch(WorkoutActions.addSet({ newExercise: newExercise }));
  };

  const onAddRound = (roundExercises: Exercise[]) => {
    dispatch(WorkoutActions.addRound({ roundExercises }));
  };

  return (
    <Container>
      <h1 className="pt-4">{workoutName}</h1>
      <h5>{workoutType} workout</h5>
      {activeRound ? (
        <ActiveRound
          activeRound={activeRound}
          onUpdateRepCount={onUpdateRepCount}
          onUpdateWeightValue={onUpdateWeightValue}
          onCompleteRound={onCompleteRound}
          onAddSet={onAddSet}
        />
      ) : (
        <NewRound onAddRound={onAddRound} />
      )}

      {completedRoundList.map((round, index) => {
        return (
          <Card
            key={index}
            className={`complete-round ${index % 2 === 0 && "odd"}`}
          >
            <Container className="p-4 fw-medium text-center">
              <Row>
                <Col>
                  <h5 className="fw-bold text-start text-capitalize">
                    {round.setList[0].exercise.exerciseName}
                  </h5>
                </Col>
                <Col className="d-flex justify-content-end"></Col>
              </Row>

              <Row>
                <Col xs={10}>
                  {round.setList.map((set, index) => {
                    return (
                      <Row key={index} className="p-1">
                        <Col xs={2}>
                          <span className="white bubble">{index + 1}</span>
                        </Col>
                        <Col xs={2}>
                          <span>{set.repCount}</span>
                        </Col>
                        <Col xs={1}>
                          <span>{"x"}</span>
                        </Col>
                        <Col xs={2}>
                          <span>{set.weightKg}</span>
                        </Col>
                      </Row>
                    );
                  })}
                </Col>
                <Col xs={2}></Col>
              </Row>
            </Container>
          </Card>
        );
      })}
    </Container>
  );
};

export default Workout;
