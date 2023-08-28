import { useEffect, useState } from "react";

type Props = {
  valueDescription: string | "";
  valueName: string | "";
  options: any[];
  onChange: (value?: any) => void;
};

const SelectInput = (props: Props) => {
  const { onChange, options, valueName, valueDescription } = props;

  const [inputValue, setInputValue] = useState(valueDescription || "");

  return (
    <select
      className="form-select text-capitalize"
      value={inputValue}
      onChange={(e) => {
        onChange(e.target.value);
      }}
    >
      {options.map((option, i) => {
        return (
          <option key={i} value={option.id}>
            <span>{option[valueName]}</span>
          </option>
        );
      })}
    </select>
  );
};

export default SelectInput;
