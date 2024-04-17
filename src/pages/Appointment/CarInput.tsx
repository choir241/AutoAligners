import { SelectCarMakeInput } from "../../components/Reservation/SelectCar/SelectCarMakeInput";
import { SelectCarModelInput } from "../../components/Reservation/SelectCar/SelectCarModelInput";
import { SelectCarYearInput } from "../../components/Reservation/SelectCar/SelectCarYearInput";
import { ChooseTwoInput } from "../../components/InputForms/Inputs";
import { RenderCarServices } from "../../components/InputForms/RenderCarServices";

interface CarInputInterface {
  carService: string;
  carModel: string;
  carMake: string;
  carYear: string;
  carYearOptions: React.JSX.Element[];
  carMakeOptions: React.JSX.Element[];
  carModelOptions: React.JSX.Element[];
  setCarService: (e: string) => void;
  setCarModel: (e: string) => void;
  setCarMake: (e: string) => void;
  setCarYear: (e: string) => void;
  setCarMakeOptions: (e: React.JSX.Element[]) => void;
  setCarModelOptions: (e: React.JSX.Element[]) => void;
  setStay_Leave: (e: string) => void;
}

export default function CarInput(props: CarInputInterface) {
  return (
    <section className="section-1 flex flex-col alignCenter">
      <section className="flex flex-col alignCenter">
        {SelectCarMakeInput({
          defaultValue: "Car Make",
          options: props.carMakeOptions,
          onChange: (e: string) => props.setCarMake(e),
          carMake: props.carMake,
          carYear: props.carYear,
          carModel: props.carModel,
          resetModel: (e: string) => props.setCarModel(e),
          resetYear: (e: string) => props.setCarYear(e),
          resetMake: (e: string) => props.setCarMake(e),
        })}

        {SelectCarModelInput({
          defaultValue: "Car Model",
          options: props.carModelOptions,
          onChange: (e: string) => props.setCarModel(e),
          carModel: props.carModel,
          carYear: props.carYear,
          resetModel: (e: string) => props.setCarModel(e),
          resetYear: (e: string) => props.setCarYear(e),
        })}

        {SelectCarYearInput({
          defaultValue: "Car Year",
          options: props.carYearOptions,
          onChange: (e: string) => props.setCarYear(e),
          carYear: props.carYear,
        })}
      </section>

      {ChooseTwoInput({
        text1: "Drop off car",
        text2: "Wait for car",
        name: "stayLeave",
        onChange: (e: string) => props.setStay_Leave(e),
      })}

      {RenderCarServices((e: string) => props.setCarService(e))}
    </section>
  );
}
