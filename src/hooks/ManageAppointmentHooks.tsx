import api from "../api/api"
import React,{useEffect} from "react"
import {Link} from "react-router-dom"
import {Appointment} from "./ReservationHooks"
import axios from "axios"
import {Button} from "../components/Button"

export async function handleDeleteAppointment(id:string | undefined){
    await api.deleteDocument(process.env.REACT_APP_DATABASE_ID, process.env.REACT_APP_COLLECTION_ID, id);
    window.location.reload();
}

async function NotifyClient(email:string, service:string, year: string, model: string, make:string, estimateId?: string){
        try{

            const formData = new URLSearchParams();
            formData.append("email", email)
            formData.append("service", service)
            formData.append("carYear", year)
            formData.append("carModel", model)
            formData.append("carMake", make)
            
            await api.deleteDocument(process.env.REACT_APP_DATABASE_ID, process.env.REACT_APP_COLLECTION_ID, estimateId);

            const data = await axios.post("https://car-app-backend-0ejb.onrender.com/sendEmail", formData, {})

            if(data){
                window.location.reload();
            }

        }catch(err){    
            console.error(err)
        }
}

export function displayAppointments(appointments: Appointment[], classNameContainer: string, startIndex: number, endIndex: number):React.JSX.Element[]{

    return appointments.map((appointment: Appointment, i: number)=>{

        const appointmentDate = appointment.date.split("D")[0];
        const appointmentDayoFWeek = appointment.date.split("D")[1];
        const appointmentTime = parseInt(appointment.time)

        const currentDate = new Date();
        const currentMonth = currentDate.getMonth()+1;
        const currentDay = currentDate.getDate();
        const currentYear = currentDate.getFullYear();

        const currentHours = currentDate.getHours();
    
        const apptMonth = parseInt(appointmentDate.split("/")[0])
        const apptDate =  parseInt(appointmentDate.split("/")[1])
        const apptYear =  parseInt(appointmentDate.split("/")[2])
   
        function checkExpired(){
            if(apptYear<currentYear){
                return false
            }else if(apptMonth<currentMonth){
                return false
            }else if(apptDate<currentDay){
                return false
            }else if(apptYear >= currentYear && apptMonth >= currentMonth && apptDate >= currentDay){
                return true
            }
        }
    
            
         return(
             <div key = {i} className = {`${classNameContainer} ${(checkExpired() && appointmentTime <= currentHours) ? "" : "expired"}`}>
                <section className = {classNameContainer === "appointmentContainer" ? "flex flex-col" : "flex justifyBetween"}>
                 <div className = "flex alignCenter">
                    <h1>{appointment.firstName} {appointment.lastName}</h1>
                    <i className="fa-regular fa-trash-can button" onClick= {()=>handleDeleteAppointment(appointment.$id)}></i>
                    <Link to = "/editAppointment" className="fa-regular fa-pen-to-square button" onClick = {()=>localStorage.setItem("id", appointment.$id || "")}></Link>
                 </div>
          
                 <div className = "flex">
                 <h1>{appointmentDate}</h1>
                 {classNameContainer === "appointmentContainer" ? "" : <h1>{appointmentDayoFWeek}</h1>}
                 <h1>{appointmentTime > 12 ? (appointmentTime -12).toString() + ":00PM" : appointmentTime + ":00AM"}</h1>
                 </div>
               
                </section>

                 <section className = {classNameContainer === "appointmentContainer" ? "flex flex-col" : "flex justifyBetween"}>
                 <h2>{appointment.service}</h2>
                 <div className = "flex">
                    <h2>{appointment.carMake}</h2>
                    <h2>{appointment.carModel}</h2>
                    <h2>{appointment.carYear}</h2>
                 </div>
    
                 </section>

                <div className = "flex alignCenter">
                {(checkExpired() && appointmentTime <= currentHours) 
                ? <button className = "button" onClick = {()=>NotifyClient(appointment.email, appointment.service, appointment.carYear, appointment.carModel, appointment.carMake, appointment.$id)}>Notify client that Car is ready</button>                : 
                   <h2>Expired Apppointment</h2> }
                    <i className = {(checkExpired() && appointmentTime <= currentHours) ? "" : "fa-solid fa-triangle-exclamation"}></i>
                </div>
           
             </div>
         )
     }).slice(startIndex, endIndex);
     
 }


 //search
 //enter value into search
 //using appointment database, find appointment with string containing that value
 //if none exist, return no results
 //if exists, first show by exact wording and exact order of value
 //then show by exacy wording but in any order
 //re-render manageAppointments page to show this
 
export interface Search{
    searchValue:string, 
    setSearchValue: (e:string)=>void, 
    setAppointments: (e:any[])=>void,
    suggestions: React.JSX.Element | undefined,
    setSuggestions: (e:React.JSX.Element)=>void,
    hidden: boolean,
    setHidden: (e:boolean) => void
}


function includeResults(appointments: Appointment[], appointmentFields: string[], check: boolean, props: Search){
        if(check){
            const filteredAppointments = appointments.filter((appointment:Appointment) => {
                return Object.values(appointment)
                    .some(value => typeof value === "string" ? value.toLowerCase().includes(props.searchValue.toLowerCase()) : "");
            });
    
            const suggestedValues = appointmentFields.flatMap(field =>
                filteredAppointments
                    .filter((appointment:any) => appointment[field].toLowerCase().includes(props.searchValue.toLowerCase()))
            );
    
            return suggestedValues;
        }else{
            const filteredAppointments = appointments.filter((appointment:Appointment) => {
                return Object.values(appointment)
                    .some(value => typeof value === "string" ? value.toLowerCase().includes(props.searchValue.toLowerCase()) : "");
            });
    
            const suggestedValues = appointmentFields.flatMap(field =>
                filteredAppointments
                    .filter((appointment:any) => appointment[field].toLowerCase().includes(props.searchValue.toLowerCase()))
                    .map((appointment:any) => appointment[field])
            );
    
            return suggestedValues;
        }
    }

function exactResults(appointments: Appointment[], appointmentFields: string[], props: Search){
        const filteredAppointments = appointments.filter((appointment:Appointment) => {
            return Object.values(appointment)
                .some(value => typeof value === "string" ? value.toLowerCase() === props.searchValue.toLowerCase() : "");
        });

        const suggestedValues = appointmentFields.flatMap(field =>
            filteredAppointments
                .filter((appointment:any) => appointment[field].toLowerCase() === props.searchValue.toLowerCase())
        );

        return suggestedValues;
    }


 
export async function searchResults(props: Search){
        try{
            const appointments = await api.listDocuments(process.env.REACT_APP_DATABASE_ID, process.env.REACT_APP_COLLECTION_ID)

            const exactValues =  exactResults(appointments.documents, ['carMake', 'carModel', 'carYear', 'service', 'firstName', 'lastName', 'time'],       
            {hidden : props.hidden, searchValue: props.searchValue, setSearchValue: (e:string)=>props.setSearchValue(e), setHidden: (e:boolean)=>props.setHidden(e), setAppointments: (e:Appointment[])=>props.setAppointments(e), suggestions: props.suggestions, setSuggestions: (e:React.JSX.Element)=>props.setSuggestions(e)})
            
            const includeValues = includeResults(appointments.documents, ['carMake', 'carModel', 'carYear', 'service', 'firstName', 'lastName', 'time'], false,             
            {hidden : props.hidden, searchValue: props.searchValue, setSearchValue: (e:string)=>props.setSearchValue(e), setHidden: (e:boolean)=>props.setHidden(e), setAppointments: (e:Appointment[])=>props.setAppointments(e), suggestions: props.suggestions, setSuggestions: (e:React.JSX.Element)=>props.setSuggestions(e)})
            
       
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

export function AutoSuggest(props: Search, searchValue: string){

            useEffect(()=>{
                async function searchSuggest(){
                    try{
                        const appointments = await api.listDocuments(process.env.REACT_APP_DATABASE_ID, process.env.REACT_APP_COLLECTION_ID);

                        const suggestedValues = includeResults(appointments.documents, ['carMake', 'carModel', 'carYear', 'service', 'firstName', 'lastName', 'time'], false,             
                        {hidden : props.hidden, searchValue: props.searchValue, setSearchValue: (e:string)=>props.setSearchValue(e), setHidden: (e:boolean)=>props.setHidden(e), setAppointments: (e:Appointment[])=>props.setAppointments(e), suggestions: props.suggestions, setSuggestions: (e:React.JSX.Element)=>props.setSuggestions(e)})

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
            },[searchValue, props])

            return props.suggestions;

    }


    //type search value
    //as a new letter is entered in search bar, list possible choices user can make based on the letters in search bar so far
    //like if the user inputs el, suggest "Kyrielight", "Elizabeth" or "Fuel Systems".
    //if the user clicks on one of these suggestions, the search value becomes that suggestion 

 

    async function filterByValue(props: Search, filter: string){
      try{
        const appointments = await api.listDocuments(process.env.REACT_APP_DATABASE_ID, process.env.REACT_APP_COLLECTION_ID)

        if(filter === "make"){
            const sortAppointments = appointments.documents.sort((a:Appointment, b: Appointment)=>a.carMake.localeCompare(b.carMake));
            props.setAppointments(sortAppointments);
        }else if(filter === "model"){
            const sortAppointments = appointments.documents.sort((a:Appointment, b: Appointment)=>a.carModel.localeCompare(b.carModel));
            props.setAppointments(sortAppointments);
        }else if(filter === "year"){
            const sortAppointments = appointments.documents.sort((a:Appointment, b: Appointment)=>parseInt(a.carYear) - parseInt(b.carYear));
            props.setAppointments(sortAppointments);
        }else if(filter === "service"){
            const sortAppointments = appointments.documents.sort((a:Appointment, b: Appointment)=>a.service.localeCompare(b.service));
            props.setAppointments(sortAppointments);
        }else if(filter === "date"){
            const sortAppointments = appointments.documents.sort((a:Appointment, b: Appointment)=>{
                const aDate = new Date(a.date.split("D")[0]);
                const bDate = new Date(b.date.split("D")[0]);
                if(aDate < bDate){
                    return -1;
                }else if(aDate > bDate){
                    return 1;
                }else{
                    return 0;
                }
            })
            props.setAppointments(sortAppointments);
        }else if(filter === "firstName"){
            const sortAppointments = appointments.documents.sort((a:Appointment, b: Appointment)=>a.firstName.localeCompare(b.firstName));
            props.setAppointments(sortAppointments);
        }else if(filter === "lastName"){
            const sortAppointments = appointments.documents.sort((a:Appointment, b: Appointment)=>a.lastName.localeCompare(b.lastName));
            props.setAppointments(sortAppointments);
        }


      }catch(err){
        console.error(err);
      }
    }

    //filter buttons
    //select from date, model, make, year or service, name
    //when selected, it will re-render appointments based on that filter alphabetically/recent-latest


export function searchFilters(props: Search){
        return(
            <section className = "filters flex justifyBetween alignCenter flex-col">

                <i className = "fa-solid fa-xmark button" id = "button" onClick = {()=>props.setHidden(!props.hidden)}></i>

                {Button({text: "Filter By Car Make", handleButtonClick: (e)=>{
                    e.preventDefault();
                    filterByValue({hidden : props.hidden, searchValue: props.searchValue, setSearchValue: (e:string)=>props.setSearchValue(e), setHidden: (e:boolean)=>props.setHidden(e), setAppointments: (e:Appointment[])=>props.setAppointments(e), suggestions: props.suggestions, setSuggestions: (e:React.JSX.Element)=>props.setSuggestions(e)}, 
                    "make");
                }})}
        
                {Button({text: "Filter By Car Model", handleButtonClick: (e)=>{
                    e.preventDefault();
                    filterByValue({hidden : props.hidden, searchValue: props.searchValue, setSearchValue: (e:string)=>props.setSearchValue(e), setHidden: (e:boolean)=>props.setHidden(e), setAppointments: (e:Appointment[])=>props.setAppointments(e), suggestions: props.suggestions, setSuggestions: (e:React.JSX.Element)=>props.setSuggestions(e)}, 
                    "model");
                }})}
        
                {Button({text: "Filter By Car Year", handleButtonClick: (e)=>{
                    e.preventDefault();
                    filterByValue({hidden : props.hidden, searchValue: props.searchValue, setSearchValue: (e:string)=>props.setSearchValue(e), setHidden: (e:boolean)=>props.setHidden(e), setAppointments: (e:Appointment[])=>props.setAppointments(e), suggestions: props.suggestions, setSuggestions: (e:React.JSX.Element)=>props.setSuggestions(e)},
                    "year");
                }})}
        
                {Button({text: "Filter By Car Service", handleButtonClick: (e)=>{
                    e.preventDefault();
                    filterByValue({hidden : props.hidden, searchValue: props.searchValue, setSearchValue: (e:string)=>props.setSearchValue(e), setHidden: (e:boolean)=>props.setHidden(e), setAppointments: (e:Appointment[])=>props.setAppointments(e), suggestions: props.suggestions, setSuggestions: (e:React.JSX.Element)=>props.setSuggestions(e)},
                    "service");
                }})}
        
                {Button({text: "Filter By Date", handleButtonClick: (e)=>{
                    e.preventDefault();
                    filterByValue({hidden : props.hidden, searchValue: props.searchValue, setSearchValue: (e:string)=>props.setSearchValue(e), setHidden: (e:boolean)=>props.setHidden(e), setAppointments: (e:Appointment[])=>props.setAppointments(e), suggestions: props.suggestions, setSuggestions: (e:React.JSX.Element)=>props.setSuggestions(e)},
                    "date");
                }})}
        
                {Button({text: "Filter By First Name", handleButtonClick: (e)=>{
                    e.preventDefault();
                    filterByValue({hidden : props.hidden, searchValue: props.searchValue, setSearchValue: (e:string)=>props.setSearchValue(e), setHidden: (e:boolean)=>props.setHidden(e), setAppointments: (e:Appointment[])=>props.setAppointments(e), suggestions: props.suggestions, setSuggestions: (e:React.JSX.Element)=>props.setSuggestions(e)},
                    "firstName");
                }})}
        
                {Button({text: "Filter By Last Name", handleButtonClick: (e)=>{
                    e.preventDefault();
                    filterByValue({hidden : props.hidden, searchValue: props.searchValue, setSearchValue: (e:string)=>props.setSearchValue(e), setHidden: (e:boolean)=>props.setHidden(e), setAppointments: (e:Appointment[])=>props.setAppointments(e), suggestions: props.suggestions, setSuggestions: (e:React.JSX.Element)=>props.setSuggestions(e)},
                    "lastName");
                }})}
        </section>
        )
    }