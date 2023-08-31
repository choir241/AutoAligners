import React, {useState, useEffect} from "react"
import {Appointment, getAppointmentData} from "../../hooks/ReservationHooks"
import Nav from "../../components/Nav"
import Footer from "../../components/Footer"
import { displayAppointments } from "../../hooks/ManageAppointmentHooks"
import PaginatedButtons from "../../components/Graphs/PaginatedButtons"

export default function ManageAppointments(){

    const [appointments, setAppointments] = useState<Appointment[]>([])
    const [classNameContainer, setClassNameContainer] = useState<string>("appointmentContainer")
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 4;

    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
  

    useEffect(()=>{
        getAppointmentData((e:Appointment[])=>setAppointments(e))
    },[])

    return(
        <main>
            <Nav pageHeading = "Manage Appointments"/>

            <section className = "flex justifyCenter">
                <i className="fa-solid fa-list appointmentContainer" onClick = {()=>setClassNameContainer("listAppointmentContainer")}></i>
                <i className="fa-solid fa-grip appointmentContainer" onClick = {()=>setClassNameContainer("appointmentContainer")}></i>
                <PaginatedButtons currentPage = {currentPage} setCurrentPage = {(e:number)=>setCurrentPage(e)} rowsPerPage={rowsPerPage} cartLength={appointments.length}/>
            </section>
          
            <section className = "appointments flex">
                {displayAppointments(appointments, classNameContainer, startIndex, endIndex)}
            </section>

            <Footer/>

        </main>
    )
}