import { IAptTimeAndDay } from "./calendar";
import { daysOfWeek } from "../../api/dates";
import { timeLogic } from "./TimeLogic";
import { useState } from "react";
import NumberPaignation from "./numberPagination";
import ButtonText from "../Buttons/ButtonText";

export default function RenderReservation({
  calendar,
}: {
  calendar: IAptTimeAndDay[];
}) {
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <>
      <section className="flex">
        {calendar
          .map((date) => {
            return (
              <section className="day">
                <p>{daysOfWeek[date.dayOfWeek]}</p>
                <p>
                  {date.month}/{date.day}/{date.year}
                </p>
                {timeLogic().map((time) => {
                  return (
                    <div className="time">
                      {time.from}-{time.to}
                    </div>
                  );
                })}
              </section>
            );
          })
          .slice(currentPage, currentPage + 4)}
      </section>

      <section className="flex mt-2 justify-between w-full">
        <ButtonText
          className={`${currentPage > 0 ? "" : "disabled"}`}
          label={"Previous"}
          onClickEventHandler={() =>
            currentPage > 0 ? setCurrentPage(currentPage - 4) : ""
          }
        />

        <NumberPaignation
          maxNumOfElements={calendar.length - 1}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />

        <ButtonText
          className={`${currentPage + 4 < calendar.length - 1 ? "" : "disabled"}`}
          label={"Next"}
          onClickEventHandler={() =>
            currentPage + 4 < calendar.length - 1
              ? setCurrentPage(currentPage + 4)
              : ""
          }
        />
      </section>
    </>
  );
}
