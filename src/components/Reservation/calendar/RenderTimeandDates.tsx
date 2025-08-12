import { IAptDay } from "./calendar";
import { daysOfWeek } from "../../../api/dates";
import { timeLogic } from "./TimeLogic";
import { useState } from "react";
import NumberPaignation from "./numberPagination";
import ButtonText from "../../Buttons/ButtonText";
import { labels } from "../../../api/labels";
import { DarkModeContext } from "../../../middleware/Context";
import { useContext } from "react";

export interface IAptDateAndTime {
  dayOfWeek: number;
  date: string;
  to: string;
  from: string;
}

export default function RenderTimeAndDates({
  calendar,
  setApptDateAndTime,
  apptDateAndTime,
}: {
  calendar: IAptDay[];
  setApptDateAndTime: (e: IAptDateAndTime) => void;
  apptDateAndTime: IAptDateAndTime;
}) {
  const [currentPage, setCurrentPage] = useState(0);
  const { toggleDarkMode } = useContext(DarkModeContext);

  return (
    <div
      className={`flex h-36vh mx-2 mb-6 flex-col items-center bg-black justify-center p-4 shadow-2xs ${toggleDarkMode === labels.mode.light ? labels.mode.dark : labels.mode.light}`}
    >
      <section className='flex'>
        {calendar
          .map((date, dateI) => {
            return (
              <section className="day" key={date + "-" + dateI}>
                <p>{daysOfWeek[date.dayOfWeek]}</p>
                <p>
                  {date.month}/{date.day}/{date.year}
                </p>
                {timeLogic().map((time, i) => {
                  return (
                    <div
                      className={`time ${time.from === apptDateAndTime.from && time.to === apptDateAndTime.to && apptDateAndTime.date === date.month + "-" + date.day + "-" + date.year ? "clicked" : ""}`}
                      key={i}
                      onClick={() => {
                        setApptDateAndTime({
                          from: time.from,
                          to: time.to,
                          dayOfWeek: date.dayOfWeek,
                          date: date.month + "-" + date.day + "-" + date.year,
                        });
                      }}
                    >
                      {time.from}-{time.to}
                    </div>
                  );
                })}
              </section>
            );
          })
          .slice(currentPage, currentPage + 6)}
      </section>

      <section className="flex mt-2 justify-between w-full">
        <ButtonText
          className={`${currentPage > 0 ? "" : "disabled"}`}
          label={"Previous"}
          onClickEventHandler={() =>
            currentPage > 0 ? setCurrentPage(currentPage - 6) : ""
          }
        />

        <NumberPaignation
          maxNumOfElements={calendar.length - 1}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />

        <ButtonText
          className={`${currentPage + 6 < calendar.length - 1 ? "" : "disabled"}`}
          label={"Next"}
          onClickEventHandler={() =>
            currentPage + 6 < calendar.length - 1
              ? setCurrentPage(currentPage + 6)
              : ""
          }
        />
      </section>
    </div>
  );
}
