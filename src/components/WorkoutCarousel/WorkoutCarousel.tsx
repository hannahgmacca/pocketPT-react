import { Container } from "react-bootstrap";
import WorkoutCarouselCard from "./WorkoutCarouselCard";
import { Workout } from "../../models/Workout";
import { useCallback } from "react";

type Props = {
  activeWorkout?: Workout;
};

const WorkoutCarousel = (props: Props) => {
  const { activeWorkout } = props;

  const getProgress = useCallback(
    (workoutType: string) => {
      if (
        !activeWorkout ||
        activeWorkout.workoutType.toString() !== workoutType
      ) {
        return 0;
      }

      const activeRounds = activeWorkout.activeRound?.setList.length ?? 0;
      const completedRounds = activeWorkout.completedRoundList.length;
      const progress = (activeRounds / (completedRounds + activeRounds)) * 100;

      return progress;
    },
    [activeWorkout]
  );

  return (
    <div style={{ margin: "25px 0" }}>
      <WorkoutCarouselCard
        title="Weights"
        subtitle="Start a weights session"
        progress={getProgress("strength")}
        isActive={getProgress("strength") !== undefined}
      ></WorkoutCarouselCard>
    </div>
  );
};
export default WorkoutCarousel;
