import { SelectYearOptions } from "../../../middleware/variables/Interfaces";

export function SelectCarYearInput(
  props: SelectYearOptions,
): React.JSX.Element {
  return (
    //changing year value does not directly effect carMake and/or carModel, so there is no need to check if value has changed
    <select
      defaultValue={props.defaultValue}
      onChange={(e) => props.onChange(e.target.value)}
    >
      <option value="default">Select {props.defaultValue}</option>
      {props.options}
    </select>
  );
}
