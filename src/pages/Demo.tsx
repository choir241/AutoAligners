import React, {useMemo, useState} from "react"
import Nav from "../components/Nav"
import {Input, handleLogin, GetUsers, User} from "../hooks/LoginHooks"
import {ButtonSubmit} from "../components/Button"

export default function Demo(){

    const name = "Helena Blavatsky"
    const email = "helena24@gmail.com"
    const employeeID = "64bb01ec8a97c4136079"
    const password = "isKri8!3"

    const [listOfUsers, setListOfUsers] = useState<User[]>([])

    useMemo(()=>{
        GetUsers((e:User[])=>setListOfUsers(e));
    },[])

    return(
        <main>
            <Nav pageHeading = {""}/>

            <form>        
              {Input({type: "email", onChange: (e:string)=> "",  name: "email", placeholder: email, disabled : true})}
              {Input({type: "text", onChange: (e:string)=> "", name: "employeeId", placeholder: employeeID, disabled : true})}
              {Input({type: "text", onChange: (e:string)=> "", name: "name", placeholder: name, disabled : true})}
              {Input({type: "password",onChange: (e:string)=> "",  name: "password", placeholder: password, disabled : true})}

            </form>

            {listOfUsers.length && listOfUsers ? 
            ButtonSubmit({handleButtonClick: ()=>handleLogin({email:email, name: name, password: password, employeeId: employeeID, listOfUsers: listOfUsers}), text: "Login"})
            : <h1>...Loading</h1>}
        </main>
    )

}