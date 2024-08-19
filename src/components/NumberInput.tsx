type Props = {
  value: number;
  onChange?: (value?: number) => void;
  showsSpinner?: boolean;
  disabled?: boolean;
};

const NumberInput = (props: Props) => {
  const { value, onChange, disabled } = props;
  if (onChange) {
    return (
      <input
        type='number'
        className='white rounded-rectangle'
        value={value || ''}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        disabled={disabled}
        step={0.5}
      ></input>
    );
  } else {
    return <input type='number' className='white rounded-rectangle' value={value || ''} disabled={disabled}></input>;
  }
};

export default NumberInput;
