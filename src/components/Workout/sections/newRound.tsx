import { Button, Card, Col, Container, Row } from "react-bootstrap";
import SelectInput from "../../SelectInput";
import { useEffect, useState } from "react";
import { Exercise } from "../../../models/Exercise";
import ExercisePicker from "../../ExercisePicker/ExercisePicker";

type Props = {
  onAddRound: (newExercises: Exercise[]) => void;
};

const NewRound = (props: Props) => {
  const { onAddRound } = props;
  const [exerciseOptions, setExerciseOptions] = useState<Exercise[]>([]);
  const [selectedExercise, setSelectedExercise] = useState<
    Exercise[] | undefined
  >(undefined);

  const onUpdateExercise = (newExercise: Exercise[]) => {
    setSelectedExercise(newExercise);
  };

  useEffect(() => {
    // setIsLoading(true);
    //TODO Refactor fetch into exercise client

    if (exerciseOptions.length > 0) return;
    fetch("/data/exerciseOptions.json", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setExerciseOptions(response);
      });

    // setIsLoading(false);
  }, []);

  const onStartRound = () => {
    if (!selectedExercise || selectedExercise.length === 0) return;
    onAddRound(selectedExercise);
    console.log(selectedExercise);
  };

  return (
    <Card className="new-round">
      <Container className="p-4 fw-medium text-center">
        <Row>
          <Col>
            <h5 className="fw-bold text-start">{"Select Exercises"}</h5>
            <ExercisePicker
              selectedExercise={selectedExercise}
              suggestions={exerciseOptions}
              onChange={onUpdateExercise}
            ></ExercisePicker>
            <Button className="mt-2" onClick={() => onStartRound()}>
              Start round
            </Button>
          </Col>
        </Row>
      </Container>
    </Card>
  );
};

export default NewRound;
