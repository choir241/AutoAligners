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
    <div className="flex flex-col items-start mb-4">
      <label className="my-1 text-left">Choose Service For Your Car</label>
      {ChooseCarService({
        onChange: (e: string) => handleUpdateService(e),
        className: "mb-2",
      })}
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
    </div>
  );
}
