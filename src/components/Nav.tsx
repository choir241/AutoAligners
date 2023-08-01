import React from "react"
import {ButtonLink,ButtonSubmit} from "../components/Button"
import {handleLogout} from "../hooks/LoginHooks"
import {Link} from "react-router-dom"

interface nav{
    pageHeading: string
}

export default function Nav(props: nav){

    return(
        <header>
             <nav className = "flex justifyBetween">
                <Link to = "/"><h1>AutoAligners</h1></Link>
            <ul className = "flex alignCenter">
              <li><Link to = "/">Home</Link></li>
              {localStorage.getItem("email") ? "" : <li><Link to = "/estimate">Estimate Car Service</Link></li>}
              {localStorage.getItem("email") ? "" : <li><Link to = "/finance">Finance</Link></li>}
              <li><Link to = "/employee">Employee Hub</Link></li>
              
              {localStorage.getItem("email") ? <li><Link to = "/manageAppointments">Manage Appointments</Link></li> : ""}
            </ul>
            {localStorage.getItem("email") ? <div>{ButtonSubmit({handleButtonClick: (e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>handleLogout(), text: "Logout"})}</div>: ""}
            {localStorage.getItem("email") ? "" : <div>{ButtonLink({domain: "/reservation", text: "Make Reservation"})}</div>}

            </nav>

            <h2>{props.pageHeading}</h2>
        </header>
     
    )
}