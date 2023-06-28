import React, {useState, useEffect} from "react"
import {Client, Account, ID} from "appwrite"
import {toast} from "react-toastify"
import api from "../api/api"
import {ButtonSubmit} from "../components/Button"

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REACT_APP_PROJECT: string;
      NODE_ENV: 'development' | 'production';
      PORT?: string;
      PWD: string;
    }
  }
}

interface InputTypes{
  type: string,
  onChange: (e:string)=>void,
  placeholder: string
}

interface User{
  $createdAt: string, 
  $id: string,
  $updatedAt: string,
  email: string,
  emailVerification: boolean,
  name: string,
  passwordUpdate: string,
  phone: string,
  phoneVerification: boolean,
  prefs: object,
  registration: string,
  status: boolean
}

export function Input(props: InputTypes):React.JSX.Element{
  return(<input type = {props.type} onChange = {(e)=>props.onChange(e.target.value)} placeholder = {props.placeholder}/>)
}

export default function Login(){

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [user, setUser] = useState<User>();

  useEffect(()=>{
    
    async function getAccount(){
      try{
        const user = await api.getAccount();
        setUser(user);
      }catch(err){
        console.error(err);
      }
    }

    getAccount()
  },[])

  async function handleSignUp(){
    try{

      if(!email){
        toast.error("Please input an email address");
        return;
      }else if(!name){
        toast.error("Please input your full name");
        return;
      }else if(!password){
        toast.error("Please input a password");
        return;
      }
    
      const fullName = /^[A-Za-z\s]+$/;
      const mail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
      if(!fullName.test(name)){
        toast.error("Please input a valid full name");
        return;
      }else if(!mail.test(email)){
        toast.error("Please input a valid password");
        return;
      }


      const client = new Client()
      .setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
      .setProject(process.env.REACT_APP_PROJECT) // Your project ID
    
  
      const account = new Account(client);
  
      // Register User
      await account.create(
          ID.unique(),
          email,
          password,
          name
      )

      await api.createSession(email, password);
        const response = await api.getAccount();
        if(response){
          console.log(response);
          window.location.reload()
        }

    }catch(err){
      toast.error(`${err}`);
      console.error(err);
  }
  }

  async function handleLogin(){
    try{
      if(!email){
        toast.error("Please input an email address");
        return;
      }else if(!name){
        toast.error("Please input your full name");
        return;
      }else if(!password){
        toast.error("Please input a password");
        return;
      }
    
      const fullName = /^[A-Za-z\s]+$/;
      const mail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
      if(!fullName.test(name)){
        toast.error("Please input a valid full name");
        return;
      }else if(!mail.test(email)){
        toast.error("Please input a valid password");
        return;
      }

      await api.createSession(email, password);
      const response = await api.getAccount();
      if(response){
        console.log(response);
        window.location.reload()
      }
    }catch(err){
      console.error(err);
      toast.error(`${err}`);
    }
  }

  async function handleLogout(){
    try{
      const user = await api.deleteCurrentSession();
      console.log(user);
      window.location.reload();
    }catch(err){
      console.error(err);
    }
  }


  async function test(){
    console.log('test')
  }

  
  return(
    <main>
      <button onClick = {()=>{
        test()
      }}>Test</button>

      {user? <h1>Welcome {user.name}</h1> : <h1>Login</h1>}

      {user ? 
      <ButtonSubmit handleButtonClick = {(e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>handleLogout()} text = {"Logout"}/>
      :
      <form>
        <ButtonSubmit handleButtonClick = {(e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>handleLogin()} text = {"Login"}/>
        <ButtonSubmit handleButtonClick = {(e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>handleSignUp()} text = {"SignUp"}/>
        {/* <Button handleButtonClick = {()=>getAccount()} text = {"Get Account"}/> */}

        <Input type = "string" onChange = {(e)=>setEmail(e)} placeholder = "Your Email"/>
        <Input type = "string" onChange = {(e)=>setName(e)} placeholder = "Your Full Name"/>
        <Input type = "password" onChange = {(e)=>setPassword(e)} placeholder = "Your Password"/>
      </form>
      }

      {user?.$id === "649c8a408d41d5c02f5c" ? 
        <section>
          <h3>Admin Hub</h3>
        </section>
      :
        <section>
          <h3>Employee Hub</h3>

        </section>
      }
    </main>
  )
}