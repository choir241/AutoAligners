import { ChooseCarService } from "../carInputs/ChooseCarService";
import { SelectCarMakeInput } from "../carInputs/SelectCarMakeInput";
import SelectCarModelInput from "../carInputs/SelectCarModelInput";
import { SelectCarYearInput } from "../carInputs/SelectCarYearInput";
import { useContext } from "react";
import { DarkModeContext } from "../../../middleware/Context";
import { labels } from "../../../api/labels";

export default function RenderCarInputs({
  carMake,
  carModel,
  handleUpdateCarMake,
  handleUpdateCarModel,
  handleUpdateCarYear,
}: {
  carMake: string;
  carModel: string;
  handleUpdateCarMake: (e: string) => void;
  handleUpdateCarModel: (e: string) => void;
  handleUpdateCarYear: (e: string) => void;
}) {

  const {toggleDarkMode} = useContext(DarkModeContext);

  return (
    <div className={`flex flex-col items-start mb-4 justify-center mx-2 bg-black p-4 shadow-2xs ${toggleDarkMode === labels.mode.light ? labels.mode.dark : labels.mode.light}`}>
      <label className="my-1 text-left">Select Service(s)</label>
      <p className="mb-2 flex flex-wrap">Choose the service(s) you need. Our technicians will provide a detailed estimate before starting work.</p>
      <section className="flex flex-col items-start w-full">
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
 

    </div>
  );
}
