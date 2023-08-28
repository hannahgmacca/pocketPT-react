import { useEffect } from "react";
import { Exercise } from "../../models/Exercise";
import Select from "react-select";

type Props = {
  selectedExercise: Exercise[] | undefined;
  suggestions: Exercise[] | undefined;
  onChange: (value?: any) => void;
};

const ExercisePicker = (props: Props) => {
  const { onChange, suggestions, selectedExercise } = props;

  return (
    <Select
      options={suggestions}
      value={selectedExercise}
      onChange={onChange}
      isMulti
      styles={{
        option: (baseStyles) => ({
          ...baseStyles,
          color: "black",
          textAlign: "left",
          textTransform: "capitalize",
        }),
        placeholder: (baseStyles) => ({
          ...baseStyles,
          textAlign: "left",
        }),
        singleValue: (baseStyles) => ({
          ...baseStyles,
          textAlign: "left",
          textTransform: "capitalize",
        }),
      }}
    ></Select>
  );
};

export default ExercisePicker;
