import api from "../api/api"
import axios from "axios"
import React, {useEffect} from "react"
import {Button} from "../components/Button"

export interface Estimate{
    $id?: string;
    service: string;
    carMake: string;
    carModel: string;
    carYear: string;
    stayLeave?: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    zipCode?: string;
    contact?: string;
    comment?: string;
}

async function NotifyClient(props: Estimate, price: string){
    try{

        const formData = new URLSearchParams();
        formData.append("email", props.email)
        formData.append("firstName", props.firstName)
        formData.append("lastName", props.lastName)
        formData.append("service", props.service)
        formData.append("carYear", props.carYear)
        formData.append("carModel", props.carModel)
        formData.append("carMake", props.carMake)
        formData.append("price", price);
        
        await api.deleteDocument(process.env.REACT_APP_DATABASE_ID, process.env.REACT_APP_ESTIMATES_COLLECTION_ID, props.$id);

        const data = await axios.post("https://car-app-backend-0ejb.onrender.com/sendEstimateEmail", formData, {})

        if(data){
            window.location.reload();
        }

    }catch(err){
        console.error(err);
    }
}

export function RenderEstimateForm(props: Estimate, price: string, setPrice: (e:string)=>void, estimateFormDisplay: boolean, setEstimateFormDisplay: (e:boolean) => void){
    return(
        <form className = "flex flex-col alignCenter">
            <input key = "email" defaultValue = {props.email} disabled></input>
            <input key = "totalPrice" type = "text" minLength = {1} maxLength = {8} onChange = {(e)=>setPrice(e.target.value)}></input>
            <button className = "submitEstimateButton" onClick = {(e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
                e.preventDefault(); 
                NotifyClient({$id: props.$id, email: props.email, carYear: props.carYear, carModel: props.carModel, carMake: props.carMake, service: props.service, firstName: props.firstName, lastName: props.lastName}, price)
                setEstimateFormDisplay(!estimateFormDisplay)
                }}>Send Client Estimate</button>
        </form>
    )
}

export async function GetEstimates(setEstimates : (e:Estimate[])=>void){
    try{
        const data = await api.listDocuments(process.env.REACT_APP_DATABASE_ID, process.env.REACT_APP_ESTIMATES_COLLECTION_ID);
        setEstimates(data.documents);
    }catch(err){
        console.error(err)
    }
}


export function RenderEstimates(estimates: Estimate[], price: string, setPrice: (e:string)=>void, estimateFormDisplay: boolean | undefined, setEstimateFormDisplay: (e:boolean)=>void, startIndex: number, endIndex: number){

    const renderDisplay = estimates.map((item: Estimate)=>{

        const displayEstimate = estimateFormDisplay
        return(
            <section key = {item.$id} className = "estimate clearButton">
                <h2>{item.service}</h2>           
                <h2>{item.firstName} {item.lastName}</h2>    

                <div className="flex justifyBetween">
                    <h2>{item.carMake}</h2>
                    <h2>{item.carModel}</h2>
                    <h2>{item.carYear}</h2>
                </div>
                <div className="flex justifyBetween">
       
                    <h2>{item.email}</h2>
                    <h2>{item.phone}</h2>
                    <h2>{item.contact}</h2>
                </div>

                <button onClick = {()=>setEstimateFormDisplay(!estimateFormDisplay)} className = "button">Show Estimate Form</button>

                {displayEstimate ? RenderEstimateForm({$id: item.$id, email: item.email, carYear: item.carYear, carModel: item.carModel, carMake: item.carMake, firstName: item.firstName, lastName: item.lastName, service: item.service}, price, (e:string)=>setPrice(e), estimateFormDisplay, (e:boolean)=>setEstimateFormDisplay(e)) : ""}

            </section>
        )
    }).slice(startIndex, endIndex)

    return(
        <section className = "flex alignCenter flex-col">
            {renderDisplay}

        </section>
    )
}
 
interface Search{
    searchValue:string, 
    setSearchValue: (e:string)=>void, 
    setAppointments: (e:Estimate[])=>void,
    suggestions: React.JSX.Element | undefined,
    setSuggestions: (e:React.JSX.Element)=>void,
    hidden: boolean,
    setHidden: (e:boolean) => void
}

 export function SearchBar(props: Search){

    function includeResults(appointments: Estimate[], appointmentFields: string[]){
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

    function exactResults(appointments: Estimate[], appointmentFields: string[]){
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
            const estimates = await api.listDocuments(process.env.REACT_APP_DATABASE_ID, process.env.REACT_APP_ESTIMATES_COLLECTION_ID);

            const exactValues = exactResults(estimates.documents, ['carMake', 'carModel', 'carYear', 'service', 'firstName', 'lastName'])
            const includeValues = includeResults(estimates.documents, ['carMake', 'carModel', 'carYear', 'service', 'firstName', 'lastName'])


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
                        const estimates = await api.listDocuments(process.env.REACT_APP_DATABASE_ID, process.env.REACT_APP_ESTIMATES_COLLECTION_ID);

                        const filteredAppointments = estimates.documents.filter((appointment:any) => {
                            return Object.values(appointment)
                                .some(value => typeof value === "string" ? value.toLowerCase().includes(props.searchValue.toLowerCase()) : "");
                        });
                
                        const suggestedValues =  ['carMake', 'carModel', 'carYear', 'service', 'firstName', 'lastName'].flatMap(field =>
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
        const estimates = await api.listDocuments(process.env.REACT_APP_DATABASE_ID, process.env.REACT_APP_ESTIMATES_COLLECTION_ID);

        if(filter === "make"){
            const sortAppointments = estimates.documents.sort((a:any, b: any)=>a.carMake.localeCompare(b.carMake));
            props.setAppointments(sortAppointments);
        }else if(filter === "model"){
            const sortAppointments = estimates.documents.sort((a:any, b: any)=>a.carModel.localeCompare(b.carModel));
            props.setAppointments(sortAppointments);
        }else if(filter === "year"){
            const sortAppointments = estimates.documents.sort((a:any, b: any)=>parseInt(a.carYear) - parseInt(b.carYear));
            props.setAppointments(sortAppointments);
        }else if(filter === "service"){
            const sortAppointments = estimates.documents.sort((a:any, b: any)=>a.service.localeCompare(b.service));
            props.setAppointments(sortAppointments);
        }else if(filter === "firstName"){
            const sortAppointments = estimates.documents.sort((a:Estimate, b: Estimate)=>a.firstName.localeCompare(b.firstName));
            props.setAppointments(sortAppointments);
        }else if(filter === "lastName"){
            const sortAppointments = estimates.documents.sort((a:Estimate, b: Estimate)=>a.lastName.localeCompare(b.lastName));
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

                {Button({text: "Filter By Car Make", handleButtonClick: (e)=>{
                    e.preventDefault();
                    filterByValue("make");
                }})}
        
                {Button({text: "Filter By Car Model", handleButtonClick: (e)=>{
                    e.preventDefault();
                    filterByValue("model");
                }})}
        
                {Button({text: "Filter By Car Year", handleButtonClick: (e)=>{
                    e.preventDefault();
                    filterByValue("year");
                }})}
        
                {Button({text: "Filter By Car Service", handleButtonClick: (e)=>{
                    e.preventDefault();
                    filterByValue("service");
                }})}
        
                {Button({text: "Filter By Date", handleButtonClick: (e)=>{
                    e.preventDefault();
                    filterByValue("date");
                }})}
        
                {Button({text: "Filter By First Name", handleButtonClick: (e)=>{
                    e.preventDefault();
                    filterByValue("firstName");
                }})}
        
                {Button({text: "Filter By Last Name", handleButtonClick: (e)=>{
                    e.preventDefault();
                    filterByValue("lastName");
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