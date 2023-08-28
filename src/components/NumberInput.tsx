type Props = {
  value: number;
  onChange: (value?: number) => void;
  showsSpinner?: boolean;
};

const NumberInput = (props: Props) => {
  const { value, onChange } = props;
  return (
    <input
      type="number"
      className="white rounded-rectangle"
      value={value || ""}
      onChange={(e) => onChange(parseInt(e.target.value))}
    ></input>
  );
};

export default NumberInput;
