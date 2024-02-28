import { useContext, useEffect, useState } from "react";
import { AppointmentContext } from "../../middleware/states/Context";
import { GetCarData } from "../../hooks/Appointment/GetCarData";
import { SelectCarMakeInput } from "../../components/Reservation/SelectCarMakeInput";
import { SelectCarModelInput } from "../../components/Reservation/SelectCarModelInput";
import { SelectCarYearInput } from "../../components/Reservation/SelectCarYearInput";

export default function Reservation() {
  const appointmentData = useContext(AppointmentContext);
  const [carModel, setCarModel] = useState<string>("");
  const [carMake, setCarMake] = useState<string>("");
  const [carYear, setCarYear] = useState<string>("");
  const [carMakeOptions, setCarMakeOptions] = useState<React.JSX.Element[]>([]);
  const [carModelOptions, setCarModelOptions] = useState<React.JSX.Element[]>(
    [],
  );
  const [carYearOptions, setCarYearOptions] = useState<React.JSX.Element[]>([]);

  useEffect(() => {
    GetCarData({
      onMakeSelect: setCarMakeOptions,
      onModelSelect: setCarModelOptions,
      onYearSelect: setCarYearOptions,
      carMake: carMake,
      carModel: carModel,
    });
  }, [carMake, carModel]);

  return (
    <main id="reservation">
      {SelectCarMakeInput({
        defaultValue: "Car Make",
        options: carMakeOptions,
        onChange: (e: string) => setCarMake(e),
        carMake: carMake,
        carYear: carYear,
        carModel: carModel,
        resetModel: (e: string) => setCarModel(e),
        resetYear: (e: string) => setCarYear(e),
        resetMake: (e: string) => setCarMake(e),
      })}

      {SelectCarModelInput({
        defaultValue: "Car Model",
        options: carModelOptions,
        onChange: (e: string) => setCarModel(e),
        carModel: carModel,
        carYear: carYear,
        resetModel: (e: string) => setCarModel(e),
        resetYear: (e: string) => setCarYear(e),
      })}

      {SelectCarYearInput({
        defaultValue: "Car Year",
        options: carYearOptions,
        onChange: (e: string) => setCarYear(e),
        carYear: carYear,
      })}
    </main>
  );
}
