import { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import WorkoutCarousel from "../../components/WorkoutCarousel/WorkoutCarousel";
import WorkoutList from "../../components/WorkoutList/WorkoutList";
import { Workout, WorkoutShort } from "../../models/Workout";

interface indexViewModel {
  activeWorkout: Workout;
  completedWorkouts: WorkoutShort[];
}

const Home = () => {
  const [indexViewModel, setIndexViewModel] = useState({} as indexViewModel);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    //TODO Refactor fetch into user client
    fetch("/data/index.json", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => setIndexViewModel(response));

    setIsLoading(false);
  }, []);

  return (
    <Container>
      {!isLoading ? (
        <Container>
          <Row className="mt-5">
            <h1 className="fw-bold">Time to get</h1>
            <h1 className="fw-bold">active!</h1>
          </Row>
          <WorkoutCarousel
            activeWorkout={indexViewModel.activeWorkout}
          ></WorkoutCarousel>
          <WorkoutList
            title="Previous Workouts"
            workoutList={indexViewModel.completedWorkouts}
          ></WorkoutList>{" "}
        </Container>
      ) : (
        <div>Loading...</div>
      )}
    </Container>
  );
};

export default Home;
