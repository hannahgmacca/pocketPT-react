import { Exercise } from '../../models/Exercise';
import Select, { StylesConfig } from 'react-select';
import { WorkoutContext } from '../Workout/state/WorkoutContext';
import { useContext } from 'react';

type Props = {
  selectedExercise: Exercise[] | Exercise |  undefined;
  isMulti: boolean;
  onChange: (value?: any) => void;
};

const ExercisePicker = (props: Props) => {
  const { onChange, selectedExercise, isMulti } = props;
  const { exercises } = useContext(WorkoutContext);

  return (
    <Select
      getOptionLabel={(item) => item.exerciseName}
      getOptionValue={(item) => item._id}
      options={exercises}
      value={selectedExercise}
      onChange={onChange}
      isMulti={isMulti}
      theme={(theme) => ({
        ...theme,
        colors: {
          ...theme.colors,
          primary: '#2e2e2e',
        },
      })}
      styles={{
        menuList: (baseStyles) => ({
          ...baseStyles,
          background: 'black',
        }),
        option: (baseStyles, state) => ({
          ...baseStyles,
          color: 'white',
          textAlign: 'left',
          textTransform: 'capitalize',
          fontSize: '12px',
          background: state.isFocused ? '#242424' : '#0a0a0a',
        }),
        container: (baseStyles, state) => ({
          ...baseStyles,
          background: '#0a0a0a',
          borderColor: '#2e2e2e',
          boxShadow: '#2e2e2e',
        }),
        control: (baseStyles, state) => ({
          ...baseStyles,
          background: '#0a0a0a',
          borderColor: '#2e2e2e',
          boxShadow: '#2e2e2e',
        }),

        placeholder: (baseStyles) => ({
          ...baseStyles,
          textAlign: 'left',
        }),
        singleValue: (baseStyles) => ({
          ...baseStyles,
          textAlign: 'left',
          textTransform: 'capitalize',
        }),
      }}
    ></Select>
  );
};

export default ExercisePicker;
