import api from "../api/api"
import React from "react"
import {Link} from "react-router-dom"
import {Appointment} from "./ReservationHooks"

export async function handleDeleteAppointment(id:string | undefined){
    await api.deleteDocument(process.env.REACT_APP_DATABASE_ID, process.env.REACT_APP_COLLECTION_ID, id);
    window.location.reload();
}


export function displayAppointments(appointments: Appointment[], classNameContainer: string):React.JSX.Element[]{
    return appointments.map((appointment: Appointment, i: number)=>{
    const appointmentDate = appointment.date.split("D")[0];
    const appointmentDayoFWeek = appointment.date.split("D")[1];
    const appointmentTime = parseInt(appointment.time)

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth()+1;
    const currentDay = currentDate.getDate();
    const currentYear = currentDate.getFullYear();

    const currentHours = currentDate.getHours();
    
    const fullCurrentDate = `${currentMonth}/${currentDay}/${currentYear}` 

         return(
             <div key = {i} className = {`${classNameContainer} ${(appointmentDate > fullCurrentDate) || (appointmentDate === fullCurrentDate && appointmentTime <= currentHours) ? "" : "expired"}`}>
                <section className = {classNameContainer === "appointmentContainer" ? "flex flex-col" : "flex justifyBetween"}>
                 <div className = "flex">
                    <h1>{appointment.firstName} {appointment.lastName}</h1>
                    <i className="fa-regular fa-trash-can button" onClick= {()=>handleDeleteAppointment(appointment.$id)}></i>
                    <Link to = "/editAppointment" className="fa-regular fa-pen-to-square button" onClick = {()=>localStorage.setItem("id", appointment.$id || "")}></Link>
                 </div>
          
                 <div className = "flex">
                 <h1 className = {(appointmentDate > fullCurrentDate) || (appointmentDate === fullCurrentDate && appointmentTime <= currentHours) ? "" : "expired"}>{appointmentDate}</h1>
                 {classNameContainer === "appointmentContainer" ? "" : <h1>{appointmentDayoFWeek}</h1>}
                 <h1>{appointmentTime > 12 ? (appointmentTime -12).toString() + ":00PM" : appointmentTime + ":00AM"}</h1>
                 </div>
               
                </section>

                 <section className = {classNameContainer === "appointmentContainer" ? "flex flex-col" : "flex justifyBetween"}>
                 <h2>{appointment.service}</h2>
                 <div className = "flex">
                    <h2>{appointment.carMake}</h2>
                    <h2>{appointment.carModel}</h2>
                    <h2>{appointment.carYear}</h2>
                 </div>
    
                 </section>

                 <section className = {classNameContainer === "appointmentContainer" ? "flex flex-col" : "flex justifyBetween"}>

                 <h2>Preferred Contact: {appointment.contact}</h2>
                 <div className = "flex">
                 <h3>{appointment.phone}</h3>
                 <h3>{appointment.email}</h3>
                 </div>
                 </section>

                
                {classNameContainer === "appointmentContainer" ?
                 <section className = "flex">
                                        
                 <h3>{appointment.stayLeave}</h3>
                 <h3>Zip Code: {appointment.zipCode}</h3>
                 <h3>{appointment.comment}</h3>
                 </section>
                 :
                 ""
                }

                <div className = "flex alignCenter">
                {(appointmentDate > fullCurrentDate) || (appointmentDate === fullCurrentDate && appointmentTime <= currentHours) 
                ? <button className = "button" onClick = {()=>console.log("client was notified")}>Notify client that Car is ready</button>                : 
                   <h2>Expired Apppointment</h2> }
                    <i className = {(appointmentDate > fullCurrentDate) || (appointmentDate === fullCurrentDate && appointmentTime <= currentHours) ? "" : "fa-solid fa-triangle-exclamation"}></i>
                </div>
           
             </div>
         )
     })
 }