import {PurchasedItem} from "./PurchasesHooks" 
import {Input} from "./ReservationHooks"
import api from "../api/api"
import Nav from "../components/Nav"
import Footer from "../components/Footer"
import {ButtonLink} from "../components/Button"
import {User} from "./LoginHooks"
import { Permission, Role } from "appwrite"

export interface Profile{
    $id: string,
    email?: string,
    fileName: string,
    image: string,
    position: string,
    PTO: string,
    salary: string,
    requestedPTO: string
}

export function RenderEmployeeAppointments(purchases: PurchasedItem[], startIndex: number, endIndex: number){

    return purchases.map((cart: PurchasedItem,i: number)=>{
        let cartTotal = 0;

        for(let i = 0; i < cart.cartItems.length; i++){
            const cartItem:PurchasedItem = JSON.parse(cart.cartItems[i]);
            if(cartItem.email === localStorage.getItem("email")){

            const itemTotal = Number(cartItem.price) * parseInt(cartItem.quantity)
            
            cartTotal += itemTotal
            }
        }

        return(
            <section key = {`${cart.$createdAt}-${i}`} className = "flex justifyEvenly cartItem">
                <h2>Items Sold: {cart.cartItems.length}</h2>
                <h2>Total: ${cartTotal.toFixed(2)}</h2>
            </section>
        )

    }).slice(startIndex,endIndex)  
}

export function RenderEmployeeProfit(purchases: PurchasedItem[]){
    let cartTotal = 0;

    purchases.forEach((cart: PurchasedItem)=>{
        for(let i = 0; i < cart.cartItems.length; i++){
            const cartItem:PurchasedItem = JSON.parse(cart.cartItems[i]);

            if(cartItem.email === localStorage.getItem("email")){
        
            const itemTotal = Number(cartItem.price) * parseInt(cartItem.quantity)
            
            cartTotal += itemTotal
            }
        }
    })

    return cartTotal.toFixed(2)
}

export async function handleAddProfileImage(id: string, file: FileList | null | undefined){
    try{
        api.createImage(id, file)
    }catch(err){
        console.error(err);
    }
}

export function FileInput(setFile: (e:FileList | null)=>void){
    return(
        <input
        type = "file"
        id = "file"
        name = "file"
        className = "displayNone"
        onChange = {(e: React.ChangeEvent<HTMLInputElement>)=>{
            const test:FileList | null = e.target.files
            setFile(test)
        }}
        />
    )
}

export function EmployeeForm(setSalary:(e:string)=>void,setPosition:(e:string)=>void){
    return(
        <section className = "flex flex-col alignCenter justifyCenter ">
        {Input({type: "text", onChange: (e)=>setSalary(e), placeholder: "Set Salary"})}
        {Input({type: "text", onChange: (e)=>setPosition(e), placeholder: "Set Position"})}
        </section>
    )
}

export async function GetEmployee(setEmployee: (e:Profile)=>void){
    try{
        const data = await api.listDocuments(process.env.REACT_APP_DATABASE_ID, process.env.REACT_APP_PROFILE_COLLECTION_ID)

        const findUser = data.documents.filter((user:Profile)=>localStorage.getItem("email") === user.email)

        setEmployee(findUser[0])

    }catch(err){
        console.error(err);
    }
}


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

export async function handleEmployeeCustomization(listOfUsers: User[], email: string, salary: string, position: string, PTO: string){
    try{

        const findUser = listOfUsers.filter((employee:User)=>employee.email===email)[0]

        const data = {
            userID: findUser.$id,
            email,
            salary,
            position,
            PTO
        }

        const employeeList = await api.listDocuments(process.env.REACT_APP_DATABASE_ID, process.env.REACT_APP_PROFILE_COLLECTION_ID)

        const findEmployee = employeeList.documents.filter((employee:Profile)=>employee.email === email)
  
        if(findEmployee.length){
          await api.updateDocument(process.env.REACT_APP_DATABASE_ID, process.env.REACT_APP_PROFILE_COLLECTION_ID, findEmployee[0].$id, data)
          window.location.reload();
        }else{
          await api.createDocument(process.env.REACT_APP_DATABASE_ID, process.env.REACT_APP_PROFILE_COLLECTION_ID, data, [Permission.read(Role.any())])
          window.location.reload();
        }
        
    }catch(err){
        console.error(err);
    }
}

export async function handlePTO(listOfUsers: User[], PTO: string){
    try{

        const findUser = listOfUsers.filter((employee:User)=>employee.email===localStorage.getItem("email"))[0]

        const data = {
            userID: findUser.$id,
            email: localStorage.getItem("email"),
            PTO
        }

        const employeeList = await api.listDocuments(process.env.REACT_APP_DATABASE_ID, process.env.REACT_APP_PROFILE_COLLECTION_ID)

        const findEmployee = employeeList.documents.filter((employee:Profile)=>employee.email === localStorage.getItem("email"))
  
        if(findEmployee.length){
          await api.updateDocument(process.env.REACT_APP_DATABASE_ID, process.env.REACT_APP_PROFILE_COLLECTION_ID, findEmployee[0].$id, data)
          window.location.reload();
        }else{
          await api.createDocument(process.env.REACT_APP_DATABASE_ID, process.env.REACT_APP_PROFILE_COLLECTION_ID, data, [Permission.read(Role.any())])
          window.location.reload();
        }

    }catch(err){
        console.error(err);
    }
}