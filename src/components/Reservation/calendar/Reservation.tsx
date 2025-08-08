import { IAptDateAndTime } from "./RenderTimeandDates";
import { daysOfWeek } from "../../../api/dates";

export default function Reservation({
  apptDateAndTime,
}: {
  apptDateAndTime: IAptDateAndTime;
}) {
  return (
    <div className="mt-2 flex-start flex w-full flex-col">
      {apptDateAndTime.from ? (
        <>
          <section className='flex flex-col items-center'>
            <h3>{daysOfWeek[apptDateAndTime.dayOfWeek]}</h3>
            <h3>{apptDateAndTime.date}</h3>
            <h3>{apptDateAndTime.from + "-" + apptDateAndTime.to} </h3>
          </section>
        </>
      ) : (
        ""
      )}
    </div>
  );
}
