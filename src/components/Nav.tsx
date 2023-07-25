import React from "react"
import {ButtonLink,ButtonSubmit} from "../components/Button"
import {handleLogout} from "../hooks/LoginHooks"

export default function Nav(){

    return(
        <nav>
            <ul className = "flex">
              <h1>Car App</h1>
              <li>{ButtonLink({domain: "/", text: "Home"})}</li>
              {localStorage.getItem("email") ? "" : <li>{ButtonLink({domain: "/demo", text: "Demo"})}</li>}
              {localStorage.getItem("email") ? <li>{ButtonLink({domain: "/login", text: "Your Account"})}</li> :  <li>{ButtonLink({domain: "/login", text: "Login"})}</li>}
              {localStorage.getItem("email") ? "" : <li>{ButtonLink({domain: "/reservation", text: "Make Reservation"})}</li>}
              <li>{ButtonLink({domain: "/estimate", text: "Estimate Car Service"})}</li>
              {localStorage.getItem("email") ? <li>{ButtonLink({domain: "/manageAppointments", text: "Manage Appointments"})}</li> : ""}
              {localStorage.getItem("email") ? <li>{ButtonSubmit({handleButtonClick: (e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>handleLogout(), text: "Logout"})}</li>: ""}
            </ul>
        </nav>
    )
}