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
        onChange={(e) => onChange(parseInt(e.target.value))}
        disabled={disabled}
      ></input>
    );
  } else {
    return <input type='number' className='white rounded-rectangle' value={value || ''} disabled={disabled}></input>;
  }
};

export default NumberInput;
