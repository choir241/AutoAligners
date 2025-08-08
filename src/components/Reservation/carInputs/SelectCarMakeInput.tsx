import { carData } from "../../../api/carData";
import { removeDuplicates } from "./removeDuplicates";

interface ISelectCarMake {
  carMake: string;
  handleUpdateCarMake: (e: string) => void;
  handleUpdateCarModel: (e: string) => void;
  handleUpdateCarYear: (e: string) => void;
}

export function SelectCarMakeInput(props: ISelectCarMake) {
  //sets value for previously selected car make


  return (
    <select
      className="mb-2"
      defaultValue="Car Make"
      onChange={(e) => {

        //checks for empty string value for previousCarMake state
        if (!props.carMake) {
          props.handleUpdateCarMake(e.target.value);
        }

        //checks if the previousCarMake value is not the same as the current value selected (checks if user changes carMake value)
        if (props.carMake !== e.target.value) {
          //resets model and year values to account for changed carMake value
          //we don't want to reset make, as that would defeat the purpose of selecting new values
          props.handleUpdateCarYear("");
          props.handleUpdateCarModel("");

          //set previous previousCarMake value to the new current value selected
          props.handleUpdateCarMake(e.target.value);
        }
      }}
    >
      <option value="default">Select Car Make</option>
      {removeDuplicates(carData, "manufacturer").map((option, i)=>{
        return(
            <option key = {i}>
                {option.manufacturer}
            </option>
        )
      })}
    </select>
  );
}
