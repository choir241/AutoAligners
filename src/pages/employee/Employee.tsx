import Nav from "../../components/Nav"
import Footer from "../../components/Footer"
import React, {useState, useEffect} from "react"
import {ButtonSubmit, Button, ButtonLink} from "../../components/Button"
import {User, GenerateNewEmployee, handleLogin, GetAccount, GetUsers, DisplayUsers, Input, handleSignUp} from "../../hooks/LoginHooks"
import { PurchasedItem, GetPurchases } from "../../hooks/PurchasesHooks"
import { RenderEmployeeAppointments, RenderEmployeeProfit} from "../../hooks/EmployeeHooks"
import PaginatedButtons from "../../components/Graphs/PaginatedButtons"
import ImageUpload from "../../components/Cloudinary/Cloudinary";

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
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const [salary, setSalary] = useState<string>("");
    const [position, setPosition] = useState<string>("");
    const [employeeForm, setEmployeeForm] = useState<boolean>(false);

    const rowsPerPage = 5;

    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;  

    const rows = 2;
    const start = (currentPage-1) * rows;
    const end = startIndex + rows

    useEffect(()=>{
      if(localStorage.getItem("email")){
        GetAccount((e:User) => setUser(e))
      }
    },[])
  
    useEffect(()=>{
        GetUsers((e:User[])=>setListOfUsers(e), (e:boolean)=>setLoading(e));
    },[])

    useEffect(()=>{
      if(localStorage.getItem("email")){
        GetPurchases((e:PurchasedItem[])=>setPurchases(e))
      }
    },[listOfUsers])
    
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
  
            {loading? 
            ButtonSubmit({handleButtonClick: (e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>handleLogin({email:email, name: name, password: password, employeeId: employeeId, listOfUsers: listOfUsers}), text: "Login"})
            : <h1>Loading...</h1>
            }
          </form>
          }
  
  
        {user ? 
        user?.$id === "649c8a408d41d5c02f5c" || user?.$id === "64e51b2e84f09ed015ec" ? 
          <section className = "admin flex justifyCenter alignCenter">

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
              <PaginatedButtons currentPage = {currentPage} cartLength = {listOfUsers.length} setCurrentPage = {(e:number)=>setCurrentPage(e)} rowsPerPage={rows}/>
              {loading ? DisplayUsers(listOfUsers, user, start, end) : <h1>Loading...</h1>}

              </section>
            
          </section>
  
        :
            <section className = "flex flex-col employee">
              <h2 className = "flex justifyCenter">Employee Hub</h2>

              <section className="flex justifyBetween">
                  <section className="flex flex-col profile">
                      <h2>Email: {user.email}</h2>
                      <h2>Start Date: {user.$createdAt.split("T")[0]}</h2>
                      <h2>Total Sales Made: ${RenderEmployeeProfit(purchases)}</h2>
                  </section>

                  <section className = "flex flex-col alignCenter purchases">

                  <button className = {`button ${showPurchases ? "" : "hubButton"}`} onClick = {()=>setShowPurchases(!showPurchases)}>{showPurchases? "Hide Your Sale History" : "Show Your Sale History"}</button>
                    {showPurchases ? <PaginatedButtons currentPage = {currentPage} cartLength = {purchases.length} setCurrentPage = {(e:number)=>setCurrentPage(e)} rowsPerPage={rowsPerPage}/> : "" }

                    {showPurchases ? RenderEmployeeAppointments(purchases, startIndex, endIndex) : ""}

                    {showPurchases ? <button className = "button" onClick = {()=>setShowPurchases(!showPurchases)}>Hide Your Sale History</button> : ""}

                    <ImageUpload/>
                                      
                    </section>
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