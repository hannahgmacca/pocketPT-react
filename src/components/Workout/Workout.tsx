import { useCallback, useEffect, useReducer } from "react";
import WorkoutReducer, { initialWorkoutState } from "./state/workoutReducer";
import { Container } from "react-bootstrap";
import { Set } from "../../models/Set";
// import { useRouteMatch } from "react-router-dom";
import { WorkoutActions } from "./state/workoutActions";
import "./workout.scss";
import { Exercise } from "../../models/Exercise";
import ActiveRound from "./sections/activeRound";
import NewRound from "./sections/newRound";
import PreviousRound from "./sections/previousRound";

// interface RouterParams {
//   workoutId: string;
// }

const Workout = () => {
  const [state, dispatch] = useReducer(WorkoutReducer, initialWorkoutState);
  const { activeRound, workoutName, completedRoundList, workoutType } = state;

  // const match = useRouteMatch<RouterParams>();

  const onFirstLoad = useCallback(async (workoutId?: string) => {
    // if (!workoutId) {
    try {
      fetch("/data/updateWorkout.json", {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      })
        .then((response) => response.json())
        .then((response) =>
          dispatch(WorkoutActions.setWorkout(response.workout))
        );

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
    (
      setIndex: number,
      setItemIndex: number,
      set: Set,
      newRepCount: number | undefined
    ) => {
      dispatch(
        WorkoutActions.updateSet({
          setIndex,
          setItemIndex,
          newSet: { ...set, repCount: newRepCount || 0 },
        })
      );
    },
    []
  );

  const onUpdateWeightValue = useCallback(
    (
      setIndex: number,
      setItemIndex: number,
      set: Set,
      newWeightValue: number | undefined
    ) => {
      dispatch(
        WorkoutActions.updateSet({
          setIndex,
          setItemIndex,
          newSet: { ...set, weightKg: newWeightValue || 0 },
        })
      );
    },
    []
  );

  const onCompleteRound = () => {
    dispatch(WorkoutActions.completeRound());
  };

  const onAddSet = () => {
    dispatch(WorkoutActions.addSet());
  };

  const onAddRound = (roundExercises: Exercise[]) => {
    dispatch(WorkoutActions.addRound({ roundExercises }));
  };

  const onEditRound = (roundIndex: number) => {
    dispatch(WorkoutActions.editRound({ roundIndex }));
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

      {completedRoundList.map((round, roundIndex) => {
        return (
          <PreviousRound
            key={roundIndex}
            round={round}
            index={roundIndex}
            onEditRound={onEditRound}
          ></PreviousRound>
        );
      })}
    </Container>
  );
};

export default Workout;
