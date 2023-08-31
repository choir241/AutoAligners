import Nav from "../../components/Nav"
import Footer from "../../components/Footer"
import React, {useState, useEffect, useMemo} from "react"
import {ButtonSubmit, Button, ButtonLink} from "../../components/Button"
import {User, GenerateNewEmployee, handleLogin, GetAccount, GetUsers, DisplayUsers, Input, handleSignUp} from "../../hooks/LoginHooks"
import { PurchasedItem, GetPurchases } from "../../hooks/PurchasesHooks"
import { RenderEmployeeAppointments } from "../../hooks/EmployeeHooks"

export function EmployeeButtons(){
    return(
        <main className = "flex flex-col justifyBetween">
                <Nav pageHeading = {localStorage.getItem("email") ? "Employee Hub" : "Login/Demo"}/>


            <section className = "flex flex-col alignCenter" id = "employee">
                <nav>
                    <ul className = "flex justifyBetween flex-col">
                        {localStorage.getItem("email") ? "" : <li className = "textAlignCenter">{ButtonLink({domain : "/adminDemo", text: "Admin Demo"})}</li>}
                        {localStorage.getItem("email") ? "" : <li className = "textAlignCenter">{ButtonLink({domain : "/demo", text: "Demo"})}</li>}
                        {localStorage.getItem("email") ? "" : <li className = "textAlignCenter">{ButtonLink({domain: "/login", text: "Login"})}</li>}
                    </ul>
                </nav>
            </section>

            <Footer/>
        </main>
    )
}

export function EmployeeHub(){

    const [email, setEmail] = useState<string>("");
    const [generatedPassword, setGeneratedPassword] = useState<string>("");
    const [employeeId, setEmployeeId] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [user, setUser] = useState<User>();
    const [listOfUsers, setListOfUsers] = useState<User[]>([]);
    const [purchases, setPurchases] = useState<PurchasedItem[]>([]);
    const [showPurchases, setShowPurchases] = useState<boolean>(false);

    useEffect(()=>{
      if(localStorage.getItem("email")){
        GetAccount((e:User) => setUser(e))
      }
    },[])
  
    useMemo(()=>{
        GetUsers((e:User[])=>setListOfUsers(e));
    },[])

    useEffect(()=>{
        GetPurchases((e:PurchasedItem[])=>setPurchases(e))
    },[])
  
    //example employee id 649c8a408d41d5c02f5c

    return(
      <main id = "auth">
          <Nav pageHeading = {user ? `Welcome ${user.name}` : "Login"}/>
    

          <section className = "flex flex-col alignCenter justifyBetween">

          {user ? 
            ""
          :
          <form className = "flex flex-col alignCenter">        
            {Input({type: "email",  name: "email", onChange: (e)=>setEmail(e), placeholder: "Your Email"})}
            {Input({type: "text", name: "employeeId",  onChange: (e)=>setEmployeeId(e), placeholder: "Your EmployeeId"})}
            {Input({type: "text", name: "name",  onChange: (e)=>setName(e), placeholder: "Your Full Name"})}
            {Input({type: "password", name: "password",  onChange: (e)=>setPassword(e), placeholder: "Your Password"})}
  
            {listOfUsers && listOfUsers.length ? 
            ButtonSubmit({handleButtonClick: (e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>handleLogin({email:email, name: name, password: password, employeeId: employeeId, listOfUsers: listOfUsers}), text: "Login"})
            : <h1>Loading...</h1>
            }
          </form>
          }
  
  
        {user ? 
        user?.$id === "649c8a408d41d5c02f5c" || user?.$id === "64e51b2e84f09ed015ec" ? 
          <section className = "admin flex justifyCenter">

            <section className="flex flex-col alignCenter leftContainer">

              <h3 className = "textAlignCenter">Admin Hub</h3>
  
              <form className = "flex flex-col alignCenter">
              {Input({type: "email", name: "email", onChange: (e)=>setEmail(e), placeholder: "Employees Email"})}
              {Input({type: "text", name: "text", onChange: (e)=>setName(e), placeholder: "Employees Name"})}
              {Input({type: "text", name: "password" ,value: generatedPassword, disabled: true, onChange: (e)=>setPassword(e), placeholder: "Employees Password"})}
          
              {generatedPassword ? "" :
              Button({text: "Automate Password for New Employee Account", handleButtonClick: ()=>{GenerateNewEmployee((e:string)=>setPassword(e), (e:string)=>setGeneratedPassword(e))}})
              }
  
              {ButtonSubmit({handleButtonClick: (e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>handleSignUp({email: email, name: name, password: password}), text: "Create Employee Sign Up"})}
              </form>
            </section>


              <section className="flex flex-col alignCenter rightContainer">
              {DisplayUsers(listOfUsers, user)}

              </section>
  
            
          </section>
  
        :
            <section>
              <h2 className = "textAlignCenter">Employee Hub</h2>

                  <section className = "flex flex-col alignCenter purchases">

                  <button className = {`button ${showPurchases ? "" : "hubButton"}`} onClick = {()=>setShowPurchases(!showPurchases)}>{showPurchases? "Hide Your Sale History" : "Show Your Sale History"}</button>

                    {showPurchases ? RenderEmployeeAppointments(purchases) : ""}

                    {showPurchases ? <button className = "button" onClick = {()=>setShowPurchases(!showPurchases)}>Hide Your Sale History</button> : ""}

                  </section>
       
            </section>
        
        :
        ""
      }

      
     
          </section>

      <Footer/>
  
      </main>
    )
}

export default function Employee(){
   return (
    localStorage.getItem("email") ? <EmployeeHub/> : <EmployeeButtons/>
   )
}