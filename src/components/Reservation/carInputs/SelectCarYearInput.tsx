import { carData } from "../../../api/carData";
import { removeDuplicates } from "./removeDuplicates";

export function SelectCarYearInput({handleUpdateCarYear, carMake, carModel}:{handleUpdateCarYear: (e: string)=>void, carMake: string, carModel: string}): React.JSX.Element {
  return (
    //changing year value does not directly effect carMake and/or carModel, so there is no need to check if value has changed
    <select
      className="mb-2 w-full"
      defaultValue="Car Year"
      onChange={(e) => handleUpdateCarYear(e.target.value)}
    >
      <option value="default">Select Car Year</option>
      {removeDuplicates(carData, "year").map((carData, i) => {
        if(carData.manufacturer === carMake && carData.model === carModel){
        return <option key={i}>{carData.year}</option>;
        }
      })}
    </select>
  );
}
