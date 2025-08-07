import { IAptDateAndTime } from "./RenderTimeandDates";
import { daysOfWeek } from "../../../api/dates";
import { ChooseCarService } from "../carInputs/ChooseCarService";
import { SelectCarMakeInput } from "../carInputs/SelectCarMakeInput";
import { useState } from "react";
import { carData } from "../../../api/carData";

export default function Reservation({
  apptDateAndTime,
  setService,
  carMake,
  handleUpdateCarMake,
  handleUpdateCarModel,
  handleUpdateCarYear,
}: {
  apptDateAndTime: IAptDateAndTime;
  setService: (e: string) => void;
  carMake: string;
  handleUpdateCarMake: (e: string) => void;
  handleUpdateCarModel: (e: string) => void;
  handleUpdateCarYear: (e: string) => void;
}) {
  const [carMakeOptions, setCarMakeOptions] = useState(carData);
  const [previousCarMake, setPreviousCarMake] = useState<string>(carMake);

  const handleUpdatePreviousCarMake = (carMake: string) => {setPreviousCarMake(carMake)}

  return (
    <div className="mt-2 flex-start flex w-full flex-col">
      {apptDateAndTime.from ? (
        <>
          <section>
            <h3>{daysOfWeek[apptDateAndTime.dayOfWeek]}</h3>
            <h3>{apptDateAndTime.date}</h3>
            <h3>{apptDateAndTime.from + "-" + apptDateAndTime.to} </h3>
          </section>

          <div className="flex flex-col items-start mb-4">
            <label className="my-1 text-left">
              Choose Service For Your Car
            </label>
            {ChooseCarService({
              onChange: (e: string) => setService(e),
              className: "mb-2",
            })}
            {SelectCarMakeInput({
              carMake,
              handleUpdateCarMake,
              handleUpdateCarModel,
              handleUpdateCarYear,
              options: carMakeOptions,
              setPreviousCarMake: (e:string)=>handleUpdatePreviousCarMake(e),
              previousCarMake
            })}
            {/*
              <label className="my-1 text-left">Select Car Model</label>
              {SelectCarModelInput({
                className: "mb-2",
                defaultValue: "Car Model",
                options: carModelOptions,
                onChange: (e: string) => setCarModel(e),
                carMake: carMake,
                carModel: carModel,
                carYear: carYear,
                resetModel: (e: string) => setCarModel(e),
                resetYear: (e: string) => setCarYear(e),
                resetMake: (e: string) => setCarMake(e),
              })}

              <label className="my-1 text-left">Select Car Year</label>
              {SelectCarYearInput({
                className: "mb-2",
                defaultValue: "Car Year",
                options: carYearOptions,
                onChange: (e: string) => setCarYear(e),
                carMake: carMake,
                carModel: carModel,
                carYear: carYear,
                resetModel: (e: string) => setCarModel(e),
                resetYear: (e: string) => setCarYear(e),
                resetMake: (e: string) => setCarMake(e),
              })} */}
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
}
