import React, {useState, useEffect} from "react"
import { getAppointmentData} from "../../hooks/ReservationHooks"
import Nav from "../../components/Nav"
import Footer from "../../components/Footer"
import { displayAppointments} from "../../hooks/ManageAppointmentHooks"
import PaginatedButtons from "../../components/Graphs/PaginatedButtons"
import {SearchBar} from "../../components/Search"
import {Appointment} from "../../middleware/Interfaces"

export default function ManageAppointments(){

    const [appointments, setAppointments] = useState<any[]>([])
    const [classNameContainer, setClassNameContainer] = useState<string>("appointmentContainer")
    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState<string>("");
    const rowsPerPage = 4;
    const [suggestions, setSuggestions] = useState<React.JSX.Element | undefined>();
    const [hidden, setHidden] = useState(false)

    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
  

    useEffect(()=>{
        getAppointmentData((e:Appointment[])=>setAppointments(e))
    },[])

    const filterArray = ['carMake', 'carModel', 'carYear', 'service', 'firstName', 'lastName', 'time'];
    
    return(
        <main>
  <Nav pageHeading = "Manage Appointments"/>

            <section className = "flex justifyCenter">
                <i className="fa-solid fa-list appointmentContainer" onClick = {()=>setClassNameContainer("listAppointmentContainer")}></i>
                <i className="fa-solid fa-grip appointmentContainer" onClick = {()=>setClassNameContainer("appointmentContainer")}></i>
                <PaginatedButtons currentPage = {currentPage} setCurrentPage = {(e:number)=>setCurrentPage(e)} rowsPerPage={rowsPerPage} cartLength={appointments.length}/>
            </section>

            {SearchBar({hidden: hidden, setHidden: (e:boolean) => setHidden(e), suggestions: suggestions, setSuggestions: (e:React.JSX.Element)=>setSuggestions(e), searchValue: searchValue, setSearchValue: (e:string)=>setSearchValue(e), setData: (e:Appointment[])=>setAppointments(e), filterArray: filterArray, database: import.meta.env.VITE_REACT_APP_DATABASE_ID, collection: import.meta.env.VITE_REACT_APP_COLLECTION_ID})}
          
            <section className = "appointments flex">
                {appointments.length ? displayAppointments(appointments, classNameContainer, startIndex, endIndex) : <h1>No results match your search, try again.</h1>}
            </section>

            <Footer/>

        </main>
    )
}