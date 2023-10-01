import React, {useState, useEffect} from "react"
import {Appointment, getAppointmentData} from "../../hooks/ReservationHooks"
import Nav from "../../components/Nav"
import Footer from "../../components/Footer"
import { displayAppointments, SearchBar } from "../../hooks/ManageAppointmentHooks"
import PaginatedButtons from "../../components/Graphs/PaginatedButtons"

export default function ManageAppointments(){

    const [appointments, setAppointments] = useState<any[]>([])
    const [classNameContainer, setClassNameContainer] = useState<string>("appointmentContainer")
    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState<string>("");
    const rowsPerPage = 4;

    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
  

    useEffect(()=>{
        getAppointmentData((e:Appointment[])=>setAppointments(e))
    },[])

    console.log(appointments)

    return(
        <main>
            <Nav pageHeading = "Manage Appointments"/>

            <section className = "flex justifyCenter">
                <i className="fa-solid fa-list appointmentContainer" onClick = {()=>setClassNameContainer("listAppointmentContainer")}></i>
                <i className="fa-solid fa-grip appointmentContainer" onClick = {()=>setClassNameContainer("appointmentContainer")}></i>
                <PaginatedButtons currentPage = {currentPage} setCurrentPage = {(e:number)=>setCurrentPage(e)} rowsPerPage={rowsPerPage} cartLength={appointments.length}/>
            </section>

            {SearchBar({searchValue: searchValue, setSearchValue: (e:string)=>setSearchValue(e), setAppointments: (e:Appointment[])=>setAppointments(e)})}
          
            <section className = "appointments flex">
                {appointments.length ? displayAppointments(appointments, classNameContainer, startIndex, endIndex) : <h1>No results match your search, try again.</h1>}
            </section>

            <Footer/>

        </main>
    )
}