import React, {useState, useEffect} from "react"
import {Appointment, getAppointmentData} from "../hooks/ReservationHooks"
import Nav from "../components/Nav"
import api from "../api/api"

export default function ManageAppointments(){

    const [appointments, setAppointments] = useState<Appointment[]>([])

    useEffect(()=>{
        getAppointmentData((e:Appointment[])=>setAppointments(e))
    },[])

    async function handleDeleteAppointment(id:string | undefined){
        await api.deleteDocument(process.env.REACT_APP_DATABASE_ID, process.env.REACT_APP_COLLECTION_ID, id);
        console.log("delete")
        window.location.reload();
    }

    function displayAppointments():React.JSX.Element[]{
       return appointments.map((appointment: Appointment, i: number)=>{
        const appointmentDate = appointment.date.split("D")[0];
        const appointmentDayoFWeek = appointment.date.split("D")[1];
        const appointmentTime = parseInt(appointment.time)
            return(
                <div key = {i} className = "appointmentContainer">
                    <h1>{appointment.firstName} {appointment.lastName}</h1>
                    <h1>{appointmentDate}</h1>
                    <h1>{appointmentDayoFWeek}</h1>
                    <h1>{appointmentTime > 12 ? (appointmentTime -12).toString() + ":00PM" : appointmentTime + ":00AM"}</h1>

                    <section>
                    <h2>{appointment.service}</h2>
                    <h2>{appointment.carMake}</h2>
                    <h2>{appointment.carModel}</h2>
                    <h2>{appointment.carYear}</h2>
                    </section>
                    <section>

                    <h2>Preferred Contact: {appointment.contact}</h2>
                    <h3>{appointment.phone}</h3>
                    <h3>{appointment.email}</h3>
                    <h3>{appointment.stayLeave}</h3>
                    <h3>{appointment.zipCode}</h3>
                    </section>
                    <section>
                    <h3>{appointment.comment}</h3>
                    <i className="fa-regular fa-trash-can button" onClick= {()=>handleDeleteAppointment(appointment.$id)}></i>
                    <i className="fa-regular fa-pen-to-square button"></i>

                    </section>
      
                </div>
            )
        })
    }

    return(
        <main>
            <Nav/>
            <h1>Manage Appointments</h1>

            <section className = "appointments flex">
                {displayAppointments()}
            </section>
        </main>
    )
}