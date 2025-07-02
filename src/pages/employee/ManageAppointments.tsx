import React, { useState, useContext } from "react";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import { displayAppointments } from "../../hooks/ManageAppointments/DisplayAppointments";
import PaginatedButtons from "../../components/Graphs/PaginatedButtons";
import { SearchBar } from "../../components/Search";
import { Appointment } from "../../middleware/Interfaces/Reservation";
import { APIContext, DarkModeContext } from "../../middleware/Context";
import "./manageappts.css";

export default function ManageAppointments() {
  const { appointments, setAppointments } = useContext(APIContext);

  const [classNameContainer, setClassNameContainer] = useState<string>(
    "appointmentContainer",
  );
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 6;

  const [toggleDetails, setToggleDetails] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [suggestions, setSuggestions] = useState<
    React.JSX.Element | undefined
  >();
  const [hidden, setHidden] = useState(false);

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const filterArray = [
    "make",
    "model",
    "carYear",
    "service",
    "firstName",
    "lastName",
    "time",
  ];
  const { toggleDarkMode } = useContext(DarkModeContext);

  return (
    <main>
      <Nav pageHeading="Manage Appointments" />

      <section
        className={`mx-2 p-4 flex flex-col items-start justify-between shadow-2xs ${
          toggleDarkMode === "dark" ? "light" : "dark"
        }`}
      >
        {SearchBar({
          hidden: hidden,
          setHidden: (e: boolean) => setHidden(e),
          suggestions: suggestions,
          setSuggestions: (e: React.JSX.Element) => setSuggestions(e),
          searchValue: searchValue,
          data: appointments,
          setSearchValue: (e: string) => setSearchValue(e),
          setData: (e: Appointment[]) => setAppointments(e),
          filterArray: filterArray,
          database: import.meta.env.VITE_REACT_APP_DATABASE_ID,
          collection: import.meta.env.VITE_REACT_APP_COLLECTION_ID,
        })}

        <section className="flex mt-2">
            <PaginatedButtons
              currentPage={currentPage}
              setCurrentPage={(e: number) => setCurrentPage(e)}
              rowsPerPage={rowsPerPage}
              cartLength={appointments.length}
            />
     
        </section>

        <section className="apptGrid">
          {appointments.length ? (
            displayAppointments({
              appointments,
              classNameContainer,
              startIndex,
              endIndex,
              toggleDetails,
              setToggleDetails: (e: boolean) => setToggleDetails(e),
              toggleDarkMode,
            })
          ) : (
            <h1>No results match your search, try again.</h1>
          )}
        </section>
      </section>

      <Footer />
    </main>
  );
}
