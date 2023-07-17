import React, {useState, useEffect, useMemo} from "react"
import {ButtonSubmit, Button} from "../components/Button"
import Nav from "../components/Nav"
import {User, GenerateNewEmployee, handleLogin, handleLogout, GetAccount, GetUsers, DisplayUsers, Input, handleSignUp} from "../hooks/LoginHooks"
import api from "../api/api"
import {toast} from "react-toastify"

export default function Login(){

  const [email, setEmail] = useState<string>("");
  const [generatedPassword, setGeneratedPassword] = useState<string>("");
  const [employeeId, setEmployeeId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [user, setUser] = useState<User>();
  const [listOfUsers, setListOfUsers] = useState<User[]>([]);

  useEffect(()=>{
    GetAccount((e:User) => setUser(e))
  },[])

  useMemo(()=>{
    GetUsers((e:User[])=>setListOfUsers(e));
  },[])

  async function updateAccountName(){
    try{
      const updatedName = await api.updateAccountName(name);
      if(updatedName){
        window.location.reload();
      }
    }catch(err){
      console.error(err);
      toast.error(`${err}`);
    }
  }

  async function updateAccountPassword(){
    try{
      const updatedPassword = await api.updateAccountPassword(password);
      if(updatedPassword){
        window.location.reload();
      }
    }catch(err){
      console.error(err);
      toast.error(`${err}`);
    }
  }


  return(
    <main>
        
        <Nav/>

        {user? <h1>Welcome {user.name}</h1> : <h1>Login</h1>}

        {user ? 
        ButtonSubmit({handleButtonClick: (e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>handleLogout(), text: "Logout"})

        :
        <form>
          {ButtonSubmit({handleButtonClick: (e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>handleLogin({email:email, name: name, password: password, employeeId: employeeId, listOfUsers: listOfUsers}), text: "Login"})}
        
          {Input({type: "email",  name: "email", onChange: (e)=>setEmail(e), placeholder: "Your Email"})}
          {Input({type: "text", name: "employeeId",  onChange: (e)=>setEmployeeId(e), placeholder: "Your EmployeeId"})}
          {Input({type: "text", name: "name",  onChange: (e)=>setName(e), placeholder: "Your Full Name"})}
          {Input({type: "password", name: "password",  onChange: (e)=>setPassword(e), placeholder: "Your Password"})}
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
        <section>
          <h3>Employee Hub</h3>
        </section>
      
      :
      <section>
        <h2>Error Occured, Please Try Again Later</h2>
      </section>
    }

    {user ? 
    <section>
      <section>
        {Input({type: "text", name: "text", onChange: (e)=>setName(e), placeholder: user?.name})}
        {Button({text: "Update User's Name", handleButtonClick: ()=>updateAccountName()})}
      </section>

      <section>
      {Input({type: "password", name: "password", onChange: (e)=>setPassword(e), placeholder: "New Password Here"})}
        {Button({text: "Update User's Password", handleButtonClick: ()=>updateAccountPassword()})}
      </section>

      <section>

      </section>
    </section>
    :
    ""
    }

    </main>
  )
}