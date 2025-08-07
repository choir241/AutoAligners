import { useState } from "react";

interface ICarData {
  id_: number;
  manufacturer: string;
  model: string;
  year: number;
  vin: string;
}

interface ISelectCarMake {
  carMake: string;
  handleUpdateCarMake: (e: string) => void;
  handleUpdateCarModel: (e: string) => void;
  handleUpdateCarYear: (e: string) => void;
  options: ICarData[];
  previousCarMake: string;
  setPreviousCarMake: (e: string) => void
}

export function SelectCarMakeInput(props: ISelectCarMake): React.JSX.Element {
  //sets value for previously selected car make


  return (
    <select
      className="mb-2"
      defaultValue="Car Make"
      onChange={(e) => {
        props.handleUpdateCarMake(e.target.value);

        //checks for empty string value for previousCarMake state
        if (!props.previousCarMake) {
          props.setPreviousCarMake(e.target.value);
        }

        //checks if the previousCarMake value is not the same as the current value selected (checks if user changes carMake value)
        if (props.previousCarMake !== e.target.value) {
          //resets model and year values to account for changed carMake value
          //we don't want to reset make, as that would defeat the purpose of selecting new values
          props.handleUpdateCarYear("");
          props.handleUpdateCarModel("");

          //set previous previousCarMake value to the new current value selected
          props.setPreviousCarMake(e.target.value);
        }
      }}
    >
      <option value="default">Select Car Make</option>
      {props.options.map((option)=>{
        return(
            <option>
                {option.manufacturer}
            </option>
        )
      })}
    </select>
  );
}
