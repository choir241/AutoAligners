import { toast } from "react-toastify";
import {
  CarSelectDataInterface,
  Car,
} from "../../middleware/variables/Interfaces";
import { carData } from "../../middleware/data/Car-Data";

export async function GetCarData(props: CarSelectDataInterface) {
  try {
    // sets form options to all car makes

    const uniqueCarOptions: string[] = [];

    carData.forEach((car: Car) =>
      uniqueCarOptions.indexOf(car.manufacturer) === -1
        ? uniqueCarOptions.push(car.manufacturer)
        : "",
    );

    const carOptions: React.JSX.Element[] = uniqueCarOptions
      .sort((a: string, b: string) => a.localeCompare(b))
      .map((car: string) => <option key={car}>{car}</option>);
    //onMakeSelect is a setState() here, so we make it a separate function here to prevent re-rendering

    props.onMakeSelect(carOptions);

    if (props.carMake && props.carMake !== "default") {
      //sets form options to all car models available for selected car make value
      //returning false is there to 1. prevent the warning to appear that filter method expects a returned value 2. to return a value that won't affect the current existing desired functionality

      const uniqueCarOptions: string[] = [];

      carData.forEach((car: Car) => {
        if (
          car.manufacturer === props.carMake &&
          uniqueCarOptions.indexOf(car.model) === -1
        ) {
          uniqueCarOptions.push(car.model);
        }
      });

      //returns a new array of react jsx element with new car model values that are respective to selected car make value
      const carOptions: React.JSX.Element[] = uniqueCarOptions
        .sort((a: string, b: string) => a.localeCompare(b))
        .map((car: string) => {
          return <option key={car}>{car}</option>;
        });
      props.onModelSelect(carOptions);
    }

    if (
      props.carMake &&
      props.carModel &&
      props.carMake !== "default" &&
      props.carModel !== "default"
    ) {
      const uniqueCarOptions: number[] = [];

      //sets form options to all car years available for car make and car models
      carData.forEach((car: Car) => {
        if (
          car.manufacturer === props.carMake &&
          car.model === props.carModel &&
          uniqueCarOptions.indexOf(car.year)
        ) {
          uniqueCarOptions.push(car.year);
        }
      });

      //returns a new array of react jsx element with new car year values that are respective to selected car make & model value
      const carOptions: React.JSX.Element[] = uniqueCarOptions
        .sort((a: number, b: number) => a - b)
        .map((car: number) => {
          return <option key={car}>{car}</option>;
        });

      props.onYearSelect(carOptions);
    }
  } catch (err) {
    console.error(err);
    toast.error(`${err}`);
  }
}
