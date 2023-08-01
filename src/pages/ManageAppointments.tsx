import React, {useState, useEffect} from "react"
import {Appointment, getAppointmentData} from "../hooks/ReservationHooks"
import Nav from "../components/Nav"
import { displayAppointments } from "../hooks/ManageAppointmentHooks"

export default function ManageAppointments(){

    const [appointments, setAppointments] = useState<Appointment[]>([])
    const [classNameContainer, setClassNameContainer] = useState<string>("appointmentContainer")

    useEffect(()=>{
        getAppointmentData((e:Appointment[])=>setAppointments(e))
    },[])

    return(
        <main>
            <Nav pageHeading = ""/>
            <h1>Manage Appointments</h1>
            <section className = "flex">
                <i className="fa-solid fa-list appointmentContainer" onClick = {()=>setClassNameContainer("listAppointmentContainer")}></i>
                <i className="fa-solid fa-grip appointmentContainer" onClick = {()=>setClassNameContainer("appointmentContainer")}></i>
            </section>
          
            <section className = "appointments flex">
                {displayAppointments(appointments, classNameContainer)}
            </section>
        </main>
    )
}