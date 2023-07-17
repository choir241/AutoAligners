import React, {useState, useEffect} from "react"
import {ButtonLink,ButtonSubmit} from "../components/Button"
import {GetAccount, User} from "../hooks/LoginHooks"

import api from "../api/api"

export default function Nav(){
  
    const [user, setUser] = useState({});

    useEffect(()=>{
      try{
        GetAccount((e:User)=>setUser(e))
      }catch(err){
        console.error(err);
      }
    })

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
            <ul className = "flex">
              <h1>Car App</h1>
              <li>{ButtonLink({domain: "/", text: "Home"})}</li>
              {user ? <li>{ButtonLink({domain: "/login", text: "Your Account"})}</li> :  <li>{ButtonLink({domain: "/login", text: "Login/Signup"})}</li>}
              <li>{ButtonLink({domain: "/reservation", text: "Make Reservation"})}</li>
              <li>{ButtonLink({domain: "/estimate", text: "Estimate Car Service"})}</li>
              {user ? <li>{ButtonSubmit({handleButtonClick: (e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>handleLogout(), text: "Logout"})}</li>: ""}
            </ul>
        </nav>
    )
}