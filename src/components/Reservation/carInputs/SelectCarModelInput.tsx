import { carData } from "../../../api/carData";
import { removeDuplicates } from "./removeDuplicates";

interface ISelectCarModel {
  carMake: string;
  carModel: string;
  handleUpdateCarModel: (e: string) => void;
  handleUpdateCarYear: (e: string) => void;
}

export default function SelectCarModelInput(props: ISelectCarModel) {
  //sets value for previously selected car model

  return (
    <select
      className="mb-2"
      defaultValue="Car Model"
      onChange={(e) => {
        //checks for empty string value for previousCarModel state
        if (!props.carModel) {
          props.handleUpdateCarModel(e.target.value);
        }

        //checks if the previousCarModel value is not the same as the current value selected (checks if user changes carModel value)
        if (props.carModel !== e.target.value) {
          //resets year value to account for changed carModel value
          props.handleUpdateCarYear("");
          //we don't want to reset model/make, as that would defeat the purpose of selecting new values
          props.handleUpdateCarModel(e.target.value);
        }
      }}
    >
      <option value="default">Select Car Model</option>
      {removeDuplicates(carData, "model").map((data, i) => {
        if (data.manufacturer === props.carMake) {
          return <option key={i}>{data.model}</option>;
        }
      })}
    </select>
  );
}
