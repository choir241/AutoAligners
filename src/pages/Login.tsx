import React, {useState} from "react"
import {Client, Account, ID} from "appwrite"
import {toast} from "react-toastify"
import api from "../api/api"

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

export function Input(props: InputTypes):React.JSX.Element{
  return(<input type = {props.type} onChange = {(e)=>props.onChange(e.target.value)} placeholder = {props.placeholder}/>)
}

export default function Login(){

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  

  function handleSignUp(){
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
    account.create(
        ID.unique(),
        email,
        password,
        name
    ).then(response => {
        console.log(response);
    }, error => {
        toast.error(error);
        console.log(error);
    });

    }catch(err){
      console.error(err);
      toast.error(`${err}`);
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
      const data = await api.getAccount();
      console.log(data);
    }catch(err){
      console.error(err);
      toast.error(`${err}`);
    }
  }

  
  return(
    <main>
      <h1>Login</h1>
      
      <button onClick = {()=>handleLogin()}>Login</button>
      <button onClick = {()=>handleSignUp()}>SignUp</button>

      <Input type = "string" onChange = {(e)=>setEmail(e)} placeholder = "Your Email"/>
      <Input type = "string" onChange = {(e)=>setName(e)} placeholder = "Your Full Name"/>
      <Input type = "password" onChange = {(e)=>setPassword(e)} placeholder = "Your Password"/>

    </main>
  )
}