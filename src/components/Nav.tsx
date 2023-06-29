import React from "react"
import {ButtonLink,ButtonSubmit} from "../components/Button"
import api from "../api/api"



export default function Nav(){
    const user = localStorage.getItem("id");

    async function handleLogout(): Promise<void>{
        try{
          const user = await api.deleteCurrentSession();
          console.log(user);
          window.location.reload();
        }catch(err){
          console.error(err);
        }
      }

    return(
        <nav>
            <ul>
               <li>{ButtonLink({domain: "/", text: "Home"})}</li>
               {user ? <li>{ButtonLink({domain: "/login", text: "Your Account"})}</li> :  <li>{ButtonLink({domain: "/login", text: "Login/Signup"})}</li>}
               <li>{ButtonLink({domain: "/reservation", text: "Make Reservation"})}</li>
               {user ? <li>{ButtonSubmit({handleButtonClick: (e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>handleLogout(), text: "Logout"})}</li>: ""}
            </ul>
        </nav>
    )
}