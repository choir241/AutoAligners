import { useState } from "react";
import { SelectModelOptions } from "../../../middleware/variables/Interfaces";

export function SelectCarModelInput(
  props: SelectModelOptions,
): React.JSX.Element {
  //sets value for previously selected car model
  const [previousCarModel, setPreviousCarModel] = useState<string>(
    props.carModel,
  );

  return (
    <select
      defaultValue={props.defaultValue}
      onChange={(e) => {
        props.onChange(e.target.value);

        //checks for empty string value for previousCarModel state
        if (!previousCarModel) {
          setPreviousCarModel(e.target.value);
        }

        //checks if the previousCarModel value is not the same as the current value selected (checks if user changes carModel value)
        if (previousCarModel !== e.target.value) {
          //resets year value to account for changed carModel value
          props.resetYear("");
          //we don't want to reset model/make, as that would defeat the purpose of selecting new values
          setPreviousCarModel(e.target.value);
        }
      }}
    >
      <option value="default">Select {props.defaultValue}</option>
      {props.options}
    </select>
  );
}
