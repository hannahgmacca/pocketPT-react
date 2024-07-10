import { Dropdown } from 'react-bootstrap';
import { camelCaseToSentenceCase } from '../../common/utilities/stringUtilities';
import {  equipmentType } from "../../models/Exercise";
import Select from "react-select";
import { getEnumValues } from '../../common/utilities/converters';

type Props = {
  selectedEquipment: string;
  onChange: (value?: any) => void;
};

const EquipmentPicker = (props: Props) => {
  const { onChange, selectedEquipment } = props;

  const getSuggestedEquipment = () => {
    return getEnumValues(equipmentType).map(item => (equipmentType[item]));
  }

  console.log(getSuggestedEquipment());

  return (
    <Select
      getOptionLabel={(item) => camelCaseToSentenceCase(item)}
      options={getSuggestedEquipment()}
      value={selectedEquipment}
      onChange={onChange}
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
          color: "white",
          textAlign: "left",
          textTransform: "capitalize",
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

export default EquipmentPicker;
