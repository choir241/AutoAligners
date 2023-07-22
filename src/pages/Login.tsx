import React, {useState, useEffect, useMemo} from "react"
import {ButtonSubmit, Button} from "../components/Button"
import Nav from "../components/Nav"
import {updateAccountEmail, handleDeleteAccount, updateAccountName, updateAccountPassword, User, GenerateNewEmployee, handleLogin, GetAccount, GetUsers, DisplayUsers, Input, handleSignUp} from "../hooks/LoginHooks"

export default function Login(){

  const [email, setEmail] = useState<string>("");
  const [generatedPassword, setGeneratedPassword] = useState<string>("");
  const [displayDelete, setDisplayDelete] = useState<boolean>(false);
  const [oldPassword, setOldPassword] = useState<string>("");
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

  return(
    <main>
        
        <Nav/>

        {user? <h1>Welcome {user.name}</h1> : <h1>Login</h1>}

        {user ? 
          ""
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
      ""
    }

    {user ? 
    <section>
      <section>
        {Input({type: "text", name: "text", onChange: (e)=>setName(e), placeholder: user?.name})}
        {Button({text: "Update User's Name", handleButtonClick: ()=>updateAccountName(name)})}
      </section>

      <section>
      {Input({type: "password", name: "password", onChange: (e)=>setOldPassword(e), placeholder: "Old Password Here"})}
      {Input({type: "password", name: "password", onChange: (e)=>setPassword(e), placeholder: "New Password Here"})}
        {Button({text: "Update User's Password", handleButtonClick: ()=>updateAccountPassword(password, oldPassword)})}
      </section>

      <section>
      {Input({type: "email", name: "email", onChange: (e)=>setEmail(e), placeholder: user?.email})}
      {Input({type: "password", name: "password", onChange: (e)=>setPassword(e), placeholder: "Type your password here"})}
        {Button({text: "Update User's Email", handleButtonClick: ()=>updateAccountEmail(email, password)})}
      </section>

      <section>
        {Button({text: "Delete User's Account", handleButtonClick: ()=>setDisplayDelete(!displayDelete)})}


        <div className = {`${displayDelete ? "show" : "hidden"} deleteAccount`}>
          <h3>Are you sure you want to delete your account?</h3>
          {Button({text: "Delete Account", handleButtonClick: ()=>handleDeleteAccount(user)})}
        </div>

      </section>
    </section>
    :
    ""
    }

    </main>
  )
}