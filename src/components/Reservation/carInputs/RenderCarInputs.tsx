import { ChooseCarService } from "../carInputs/ChooseCarService";
import { SelectCarMakeInput } from "../carInputs/SelectCarMakeInput";
import SelectCarModelInput from "../carInputs/SelectCarModelInput";
import { SelectCarYearInput } from "../carInputs/SelectCarYearInput";

export default function RenderCarInputs({
  handleUpdateService,
  carMake,
  carModel,
  handleUpdateCarMake,
  handleUpdateCarModel,
  handleUpdateCarYear,
}: {
  handleUpdateService: (e: string) => void;
  carMake: string;
  carModel: string;
  handleUpdateCarMake: (e: string) => void;
  handleUpdateCarModel: (e: string) => void;
  handleUpdateCarYear: (e: string) => void;
}) {
  return (
    <div className="flex flex-col items-start mb-4 w-full">
      <label className="my-1 text-left">Select Service(s)</label>
      <p className="mb-2">Choose the services you need. Our technicians will provide a detailed estimate before starting work.</p>
      <section className="flex justify-between w-60">
      {SelectCarMakeInput({
        carMake,
        handleUpdateCarMake,
        handleUpdateCarModel,
        handleUpdateCarYear,
      })}

      {SelectCarModelInput({
        carMake: carMake,
        carModel: carModel,
        handleUpdateCarModel: (e: string) => handleUpdateCarModel(e),
        handleUpdateCarYear: (e: string) => handleUpdateCarYear(e),
      })}

      {SelectCarYearInput({
        carMake,
        carModel,
        handleUpdateCarYear,
      })}
      </section>
      {/* {ChooseCarService({
        onChange: (e: string) => handleUpdateService(e),
        className: "mb-2",
      })} */}

    </div>
  );
}
