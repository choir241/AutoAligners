import Nav from "../../components/Nav"
import Footer from "../../components/Footer"
import React, {useState, useEffect, useMemo} from "react"
import {ButtonSubmit, Button, ButtonLink} from "../../components/Button"
import {User, GenerateNewEmployee, handleLogin, GetAccount, GetUsers, DisplayUsers, Input, handleSignUp} from "../../hooks/LoginHooks"

export function EmployeeButtons(){
    return(
        <main className = "flex flex-col justifyBetween">
                <Nav pageHeading = {""}/>
            <section className = "flex flex-col alignCenter" id = "employee">
            <h1 className = "textAlignCenter">Employee Hub</h1>
                <nav>
                    <ul className = "flex justifyBetween flex-col">
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
  
    useEffect(()=>{
      if(localStorage.getItem("email")){
        GetAccount((e:User) => setUser(e))
      }
    },[])
  
    useMemo(()=>{
        GetUsers((e:User[])=>setListOfUsers(e));
    },[])
  
    //example employee id 649c8a408d41d5c02f5c

    function test(user: User | undefined):string{
      return user ? `Welcome ${user.name}` : "Login"
    }
  
    return(
      <main id = "auth">
          <Nav pageHeading = {test(user)}/>
    

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
        user?.$id === "649c8a408d41d5c02f5c" ? 
          <section>
            <h3>Admin Hub</h3>
  
            {Input({type: "email", name: "email", onChange: (e)=>setEmail(e), placeholder: "Employees Email"})}
            {Input({type: "text", name: "text", onChange: (e)=>setName(e), placeholder: "Employees Name"})}
            {Input({type: "text", name: "password" ,value: generatedPassword, disabled: true, onChange: (e)=>setPassword(e), placeholder: "Employees Password"})}
  
            {generatedPassword ? "" :
            Button({text: "Automate Password for New Employee Account", handleButtonClick: ()=>{GenerateNewEmployee((e:string)=>setPassword(e), (e:string)=>setGeneratedPassword(e))}})
            }
  
            {ButtonSubmit({handleButtonClick: (e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>handleSignUp({email: email, name: name, password: password}), text: "Create Employee Sign Up"})}
  
  
            {DisplayUsers(listOfUsers, user)}
            
          </section>
  
        :
            <h3>Employee Hub</h3>
        
        :
        ""
      }

      
      {user? 
        ButtonLink({text: "Shop", domain: "/inventoryShop"})
        : ""
      }


      {user? 
        ButtonLink({text: "Inventory", domain: "/inventory"})
        : ""
      }


      {user ? 
        ButtonLink({text: "Settings", domain: "/settings"})
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