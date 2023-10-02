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
 
interface Search{
    searchValue:string, 
    setSearchValue: (e:string)=>void, 
    setAppointments: (e:any[])=>void,
    suggestions: React.JSX.Element | undefined,
    setSuggestions: (e:React.JSX.Element)=>void
}

 export function SearchBar(props: Search){

 
    async function searchResults(){
        try{
            const appointments = await api.listDocuments(process.env.REACT_APP_DATABASE_ID, process.env.REACT_APP_COLLECTION_ID)
            const findAppointmentExact = appointments.documents.map((appointment: Appointment)=>{
           if(appointment.carMake.toLowerCase() === props.searchValue.toLowerCase()){
               return appointment
           }else if(appointment.carModel.toLowerCase() === props.searchValue.toLowerCase()){
               return appointment
           }else if(appointment.carYear.toLowerCase() === props.searchValue.toLowerCase()){
               return appointment
           }else if(appointment.service.toLowerCase() === props.searchValue.toLowerCase()){
               return appointment
           }else if(appointment.firstName.toLowerCase()=== props.searchValue.toLowerCase()){
               return appointment
           }else if(appointment.lastName.toLowerCase() === props.searchValue.toLowerCase()){
               return appointment
           }else if(appointment.time === props.searchValue.toLowerCase()){
               return appointment
           }
            })   
            
           const findAppointmentIncludes = appointments.documents.map((appointment: Appointment)=>{
           if(appointment.carMake.toLowerCase().includes(props.searchValue.toLowerCase())){
               return appointment
           }else if(appointment.carModel.toLowerCase().includes(props.searchValue.toLowerCase())){
               return appointment
           }else if(appointment.carYear.toLowerCase().includes(props.searchValue.toLowerCase())){
               return appointment
           }else if(appointment.service.toLowerCase().includes(props.searchValue.toLowerCase())){
               return appointment
           }else if(appointment.firstName.toLowerCase().includes(props.searchValue.toLowerCase())){
               return appointment
           }else if(appointment.lastName.toLowerCase().includes(props.searchValue.toLowerCase())){
               return appointment
           }else if(appointment.time.includes(props.searchValue.toLowerCase())){
               return appointment
           }
           })
       
           const exactSearchResults = [];
           const includeSearchResults = [];
       
       
           for(let i = 0; i < findAppointmentExact.length; i++){
               if(findAppointmentExact[i]){
                   exactSearchResults.push(findAppointmentExact[i]);
               }
           }
       
           for(let i = 0; i < findAppointmentIncludes.length; i++){
               if(findAppointmentIncludes[i]){
                   includeSearchResults.push(findAppointmentIncludes[i]);
               }
           }
       
           if(exactSearchResults.length && exactSearchResults){
               props.setAppointments(exactSearchResults)
           }else if(includeSearchResults.length && includeSearchResults){
               props.setAppointments(includeSearchResults)
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
                        const appointments = await api.listDocuments(process.env.REACT_APP_DATABASE_ID, process.env.REACT_APP_COLLECTION_ID);

                        const filteredAppointments = appointments.documents.filter((appointment:Appointment) => {
                            return Object.values(appointment)
                                .some(value => typeof value === "string" ? value.toLowerCase().includes(searchValue.toLowerCase()) : "");
                        });
        
                        const appointmentFields:string[] = ['carMake', 'carModel', 'carYear', 'service', 'firstName', 'lastName', 'time'];
                        const suggestedValues = appointmentFields.flatMap(field =>
                            filteredAppointments
                                .filter((appointment:any) => appointment[field].toLowerCase().includes(searchValue.toLowerCase()))
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

 
    return(
        <form>
            <section className = "flex flex-col alignCenter">
                <div className="flex alignCenter">
                    <input type = "search" value = {props.searchValue} onChange = {(e)=>props.setSearchValue(e.target.value)}/>          

                    {Button({text: "Search", handleButtonClick: (e)=>{
                    e.preventDefault();
                    searchResults()}})}
                </div>
   

                 {AutoSuggest(props.searchValue)}
            </section>

    
        </form>
       
    )
 }