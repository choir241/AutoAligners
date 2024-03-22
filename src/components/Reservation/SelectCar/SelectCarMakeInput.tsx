import { useState } from "react";
import { SelectMakeOptions } from "../../../middleware/variables/Interfaces";

export function SelectCarMakeInput(
  props: SelectMakeOptions,
): React.JSX.Element {
  //sets value for previously selected car make
  const [previousCarMake, setPreviousCarMake] = useState<string>(props.carMake);

  return (
    <select
      defaultValue={props.defaultValue}
      onChange={(e) => {
        props.onChange(e.target.value);

        //checks for empty string value for previousCarMake state
        if (!previousCarMake) {
          setPreviousCarMake(e.target.value);
        }

        //checks if the previousCarMake value is not the same as the current value selected (checks if user changes carMake value)
        if (previousCarMake !== e.target.value) {
          //resets model and year values to account for changed carMake value
          //we don't want to reset make, as that would defeat the purpose of selecting new values
          props.resetYear("");
          props.resetModel("");

          //set previous previousCarMake value to the new current value selected
          setPreviousCarMake(e.target.value);
        }
      }}
    >
      <option value="default">Select {props.defaultValue}</option>
      {props.options}
    </select>
  );
}
