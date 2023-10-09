import {Button} from "../components/Button"
import { RenderPaymentForm, CardInfo } from "./CartHooks"
import api from "../api/api"
import {Permission, Role} from "appwrite"
import {useEffect} from "react"

export interface FinanceDisplay{
    text:string, 
    display: boolean, 
    setDisplay: (e:boolean) => void, 
    cardInfo: CardInfo | undefined, 
    setCardInfo: (e:CardInfo)=>void,
    email: string,
    setEmail: (e:string) => void,
}

export interface ClientFinance{
$id: string,
$updatedAt: string,
$createdAt: string,
cardAmount: number,
cardNumber: number,
email: string,
expirationDate: string,
financeTotal: string,
securityNumber: string,
type: string
}

interface EditFinance{
    display: boolean, 
    setDisplay: (e:boolean)=>void, 
    client: string, 
    clientFinance: ClientFinance[],
    financeTotal: string,
    setFinanceTotal: (e:string) => void,
    email: string,
    setEmail: (e:string) => void
}

interface TableContent{
    clientFinance: ClientFinance[], 
    startIndex: number,
    endIndex: number, 
    displayFinance: boolean, 
    setDisplayFinance: (e:boolean)=> void,
    client: string,
    setClient: (e:string)=> void,
    financeTotal: string,
    setFinanceTotal: (e:string) => void,
    email: string,
    setEmail: (e:string) => void
}

export function toggleDisplay(setDisplay: (e:boolean)=>void, display: boolean){
    setDisplay(!display)
}

async function handlePayment(financeTotal: string, email: string, cardInfo: CardInfo | undefined){
    try{
    const cardAmount = 1000 + Math.ceil(Math.random() * 100000)

    const purchase = {  
        cardAmount,
        email,
        financeTotal,
        type: cardInfo?.type,
        cardNumber: cardInfo?.cardNumber,
        securityNumber: cardInfo?.securityNumber,
        expirationDate: cardInfo?.expirationDate
    }

       await api.createDocument(process.env.REACT_APP_CART_DATABASE_ID, process.env.REACT_APP_FINANCE_PAYMENTS_COLLECTION_ID, purchase, [Permission.read(Role.any())])

       window.location.reload();
    }catch(err){
        console.error(err);
    }
}

export function renderFinanceDisplay(props: FinanceDisplay){

    let financePlanText = ""
    let financeTotal = ""

    if(props.text === "gold"){
        financePlanText = "$199/month includes 12 services/year (Gold + Air Conditioning Service, Wheel Alignment)"
        financeTotal = "199"
    }else if(props.text === "silver"){
        financePlanText = "$120/month includes 6 services per year (Silver Subscription + Brake Check, Engine Diagnostic)."
        financeTotal = "120"
    }else if(props.text === "bronze"){
        financePlanText=  "$75/month includes 3 services per year (Oil Change, Tire Rotation, and 20-point Inspection)."
        financeTotal = "75"
    }

    return( 
        <section className = "flex flex-col alignCenter purchase">

            {Button({text: "Go Back", handleButtonClick: ()=>toggleDisplay((e:boolean)=>props.setDisplay(e), props.display)})}

            <h1>{props.text} Finance Payment Form</h1>
            
            <p>{financePlanText}</p>

            {RenderPaymentForm(props.cardInfo, (e:CardInfo)=>props.setCardInfo(e))}

            <input type="text" disabled defaultValue = {`$${financeTotal}`}/>
            <input type="email" placeholder="Enter Your Email Here!" onChange = {(e)=>props.setEmail(e.target.value)}/>

            <div className="flex justifyBetween">
                {Button({text: "Make Payment", handleButtonClick: ()=>handlePayment(financeTotal, props.email, props.cardInfo)})}
                {Button({text: "Go Back", handleButtonClick: ()=>toggleDisplay((e:boolean)=>props.setDisplay(e), props.display)})}

            </div>

         
        </section>
    )
}

export async function GetClientFinance(setClientFinance: (e:ClientFinance[])=>void){
    try{
        const data = await api.listDocuments(process.env.REACT_APP_CART_DATABASE_ID, process.env.REACT_APP_FINANCE_PAYMENTS_COLLECTION_ID);

        if(data.documents.length){
            setClientFinance(data.documents);
        }
    }catch(err){
        console.error(err);
    }
}

async function deleteClientFinance(id:string){
try{
    const data = await api.deleteDocument(process.env.REACT_APP_CART_DATABASE_ID, process.env.REACT_APP_FINANCE_PAYMENTS_COLLECTION_ID, id)
    console.log(data)
    window.location.reload();
}catch(err){
    console.error(err)
}
}

async function editClientFinance(id:string, financeTotal: string, email: string){
try{
    const data = {
        email,
        financeTotal        
    }

    await api.updateDocument(process.env.REACT_APP_CART_DATABASE_ID, process.env.REACT_APP_FINANCE_PAYMENTS_COLLECTION_ID, id, data)

    window.location.reload();
}catch(err){
    console.error(err)
}
}

export function checkDate(clientFinance: ClientFinance[]){
    try{
        const currentDate = new Date();
        const month = currentDate.getMonth() + 1
            
        const financeDates = clientFinance.filter((client:ClientFinance)=>{
            const financeArray = client.$updatedAt.split("T")[0].split("-");
            
            if(parseInt(financeArray[1]) < month){
               return client.financeTotal
            }

        })

        financeDates.forEach( async (client: ClientFinance)=>{

            client.cardAmount -= parseInt(client.financeTotal)

            const data = {
                cardAmount: client.cardAmount 
            }

            await api.updateDocument(process.env.REACT_APP_CART_DATABASE_ID, process.env.REACT_APP_FINANCE_PAYMENTS_COLLECTION_ID, client.$id, data)
        })
    
    }catch(err){
        console.error(err)
    }
}



export function renderEditFinanceDisplay(props: EditFinance){

    const findClient = props.clientFinance.filter((clientFinance: ClientFinance)=>clientFinance.$id === props.client)

    return(
    <section className = "flex flex-col alignCenter purchase">

        {Button({text: "Go Back", handleButtonClick: ()=>toggleDisplay((e:boolean)=>props.setDisplay(e), props.display)})}

        <h1>Edit Client Finance</h1>
        
        <input defaultValue = {findClient[0].email} type = "email" onChange = {(e)=>props.setEmail(e.target.value)}/>

        <h2>Manage Client Finance Plan</h2>

        <select defaultValue = {findClient[0].financeTotal} onChange = {(e)=>props.setFinanceTotal(e.target.value)}>
            <option>199</option>
            <option>120</option>
            <option>75</option>
        </select>

        <button className = "clearButton" onClick = {()=>editClientFinance(props.client, props.financeTotal, props.email)}>Edit Finance</button>
    </section>
    )
}


export function RenderClientFinance(props: TableContent){

    const tableContent = props.clientFinance.map((client: ClientFinance, i: number)=>{
        const createdAt = client.$createdAt.split("T")
        const updatedAt = client.$updatedAt.split("T")

        let currentPlan = ""

        if(client.financeTotal === "199"){
            currentPlan = "Gold"
        }else if(client.financeTotal === "120"){
            currentPlan = "Silver"
        }else if(client.financeTotal === "75"){
            currentPlan = "Bronze"
        }

        return(
        <tr className = {`${i % 2 === 0 ? "even": "odd"}`} key = {client.$id}>
            <td>{client.email}</td>
            <td>${client.financeTotal}/month</td>
            <td>{currentPlan}</td>
            <td>{createdAt[0]}</td>
            <td>{updatedAt[0]}</td>
            <td><button className = "fa-solid fa-trash clearButton" onClick = {(e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
                e.preventDefault();
                deleteClientFinance(client.$id);
            }}></button></td>
            <td><button className = "fa-solid fa-pen-to-square clearButton" onClick = {(e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
                e.preventDefault();
                props.setDisplayFinance(!props.displayFinance)
                props.setClient(client.$id);
                props.setFinanceTotal(client.financeTotal)
                props.setEmail(client.email)
            }}></button></td>
        </tr>
        )
    }).slice(props.startIndex,props.endIndex)


    return(
        <table>
            <thead>
                <tr>
                    <th>Email</th>
                    <th>Plan Cost</th>
                    <th>Plan</th>
                    <th>Created At</th>
                    <th>Updated At</th>
                    <th>Delete</th>
                    <th>Edit</th>
                </tr>
            </thead>
            <tbody>
                {tableContent}
            </tbody>
        </table>
    )
}

interface Search{
    searchValue:string, 
    setSearchValue: (e:string)=>void, 
    setAppointments: (e:ClientFinance[])=>void,
    suggestions: React.JSX.Element | undefined,
    setSuggestions: (e:React.JSX.Element)=>void,
    hidden: boolean,
    setHidden: (e:boolean) => void
}

 export function SearchBar(props: Search){

    function includeResults(appointments: ClientFinance[], appointmentFields: string[]){
        const filteredAppointments = appointments.filter((appointment:any) => {
            return Object.values(appointment)
                .some(value => typeof value === "string" ? value.toLowerCase().includes(props.searchValue.toLowerCase()) : "");
        });

        const suggestedValues = appointmentFields.flatMap(field =>
            filteredAppointments
                .filter((appointment:any) => appointment[field].toLowerCase().includes(props.searchValue.toLowerCase()))
        );

        return suggestedValues;
    }

    function exactResults(appointments: ClientFinance[], appointmentFields: string[]){
        const filteredAppointments = appointments.filter((appointment:any) => {
            return Object.values(appointment)
                .some(value => typeof value === "string" ? value.toLowerCase() === props.searchValue.toLowerCase() : "");
        });

        const suggestedValues = appointmentFields.flatMap(field =>
            filteredAppointments
                .filter((appointment:any) => appointment[field].toLowerCase() === props.searchValue.toLowerCase())
        );

        return suggestedValues;
    }


 
    async function searchResults(){
        try{
            const finances = await api.listDocuments(process.env.REACT_APP_CART_DATABASE_ID, process.env.REACT_APP_FINANCE_PAYMENTS_COLLECTION_ID);

            const exactValues = exactResults(finances.documents, ['email', 'financeTotal' ,'type'])
            const includeValues = includeResults(finances.documents, ['email', 'financeTotal' ,'type'])


           if(exactValues.length && exactValues){
               props.setAppointments(exactValues)
           }else if(includeResults.length && includeValues){
               props.setAppointments(includeValues)
           }else{
               props.setAppointments([])
           }
        }catch(err){
            console.error(err);
        }
    }

    function AutoSuggest(searchValue: string){

            useEffect(()=>{
                async function searchSuggest(){
                    try{
                        const finances = await api.listDocuments(process.env.REACT_APP_CART_DATABASE_ID, process.env.REACT_APP_FINANCE_PAYMENTS_COLLECTION_ID);

                        const filteredAppointments = finances.documents.filter((appointment:any) => {
                            return Object.values(appointment)
                                .some(value => typeof value === "string" ? value.toLowerCase().includes(props.searchValue.toLowerCase()) : "");
                        });
                
                        const suggestedValues =   ['email', 'financeTotal', 'type'].flatMap(field =>
                            filteredAppointments
                                .filter((appointment:any) => appointment[field].toLowerCase().includes(props.searchValue.toLowerCase()))
                                .map((appointment:any) => appointment[field])
                        );

                        const removeDuplicates:string[] = [];
                        suggestedValues.forEach((value:string)=>removeDuplicates.indexOf(value) === -1 ? removeDuplicates.push(value) : "")


                        let i = 0
                        const list = removeDuplicates.map((value:string)=>{
                            return(
                                <option key = {i++}>{value}</option>
                            )
                        })

                        const results = <select
                        onChange = {(e)=>props.setSearchValue(e.target.value)}
                        >{list}</select>
                        

                        props.setSuggestions(results);
                    }catch(err){
                        console.error(err);
                    }
                }

                searchSuggest()
            },[searchValue])

            return props.suggestions;

    }


    //type search value
    //as a new letter is entered in search bar, list possible choices user can make based on the letters in search bar so far
    //like if the user inputs el, suggest "Kyrielight", "Elizabeth" or "Fuel Systems".
    //if the user clicks on one of these suggestions, the search value becomes that suggestion 

 

    async function filterByValue(filter: string){
      try{
        const finances = await api.listDocuments(process.env.REACT_APP_CART_DATABASE_ID, process.env.REACT_APP_FINANCE_PAYMENTS_COLLECTION_ID);

        if(filter === "email"){
            const sortAppointments = finances.documents.sort((a:any, b: any)=>a.email.localeCompare(b.email));
            props.setAppointments(sortAppointments);
        }else if(filter === "type"){
            const sortAppointments = finances.documents.sort((a:any, b: any)=>a.type.localeCompare(b.type));
            props.setAppointments(sortAppointments);
        }else if(filter === "financeTotal"){
            const sortAppointments = finances.documents.sort((a:any, b: any)=>Number(a.financeTotal) - Number(b.financeTotal));
            props.setAppointments(sortAppointments);
        }
      }catch(err){
        console.error(err);
      }
    }

    //filter buttons
    //select from date, model, make, year or service, name
    //when selected, it will re-render appointments based on that filter alphabetically/recent-latest


    function searchFilters(){
        return(
            <section className = "filters flex justifyBetween alignCenter flex-col">

                <i className = "fa-solid fa-xmark button" id = "button" onClick = {()=>props.setHidden(!props.hidden)}></i>

                {Button({text: "Filter By Email", handleButtonClick: (e)=>{
                    e.preventDefault();
                    filterByValue("email");
                }})}
        
                {Button({text: "Filter By Card Type", handleButtonClick: (e)=>{
                    e.preventDefault();
                    filterByValue("type");
                }})}

                {Button({text: "Filter By Finance Total", handleButtonClick: (e)=>{
                    e.preventDefault();
                    filterByValue("financeTotal");
                }})}
        
        
        </section>
        )
    }

    return(
        <form className = "flex justifyCenter">
            <section className = "flex flex-col alignCenter search">

            {props.hidden ? searchFilters() : ""}
                <div className="flex alignCenter justifyEvenly">
                    <input type = "search" value = {props.searchValue} onChange = {(e)=>props.setSearchValue(e.target.value)}/>          
                    {AutoSuggest(props.searchValue)}
                    {Button({text: "Search", handleButtonClick: (e)=>{
                    e.preventDefault();
                    searchResults()}})}
                                <i className = {`${props.hidden ? "fa-solid fa-caret-up clearButton" : "fa-solid fa-caret-down clearButton"}`} onClick = {()=>props.setHidden(!props.hidden)}></i>


                </div>

            </section>

    
        </form>
       
    )
 }