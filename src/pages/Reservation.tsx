import React, {useState, useMemo} from "react"
import {Button} from "../components/Button"
import {toast} from "react-toastify"
import axios from "axios"

export default function Reservation(){

    //<>
    //1. choose appointment date
    //1.1 date/time cannot be set before current time/date
    //1.2 date/time must be respective to hours of car maintainence operation
    //1.3 date/time cannot be selected if appoinment for time/date already exists (involves database)
    //2. choose car model
    //2.1 car model info comes from API
    //2.2 if car make is selected (toyota/honda), model must match the only ones available to that brand
    //2.3  
    //3. choose options between dropping off car and waiting for it
    //4. choose service(s) desired for car (Add option to add additional comments for appointment)
    //5. add contact information so client can be contacted if/when car is finished
    //6. review and submit(?)
    //</>

    //type is string
    
    const [date, setDate] = useState<string>("");
    const [carModel, setCarModel] = useState<string>("");
    const [carMake, setCarMake] = useState<string>("");
    const [carYear, setCarYear] = useState<string>("");

    const [carMakeOptions, setCarMakeOptions] = useState<React.JSX.Element[]>([]);
    const [carModelOptions, setCarModelOptions] = useState<React.JSX.Element[]>([]);
    const [carYearOptions, setCarYearOptions] = useState<React.JSX.Element[]>([]);

    useMemo(()=>{
        async function getCarData():Promise<void>{
            try{
                //sets form options to all car makes
                const [dataResponse] = await Promise.all([
                    axios.get(`https://public.opendatasoft.com/api/records/1.0/search/?dataset=all-vehicles-model&q=&facet=make&facet=model&facet=year`)
                ])

                const carOptions:React.JSX.Element[] = dataResponse.data.facet_groups[0].facets?.map((make:any,i:number)=><option key = {i}>{make.name}</option>);
                setCarMakeOptions(carOptions);

                if(carMake){
                //sets form options to all car models available for car make
                const [carDataResponse] = await Promise.all([
                    axios.get(`https://public.opendatasoft.com/api/records/1.0/search/?dataset=all-vehicles-model&q=&facet=make&facet=model&facet=year&refine.make=${carMake}`)              
                ]);
                
                const carOptions:React.JSX.Element[] = carDataResponse.data.facet_groups[1].facets?.map((model:any,i:number)=><option key = {i}>{model.name}</option>);
                setCarModelOptions(carOptions);
                }

                if(carMake && carModel){
                //sets form options to all car years available for car make and car models
                    const [carDataResponse] = await Promise.all([
                        axios.get(`https://public.opendatasoft.com/api/records/1.0/search/?dataset=all-vehicles-model&q=&facet=make&facet=model&facet=year&refine.make=${carMake}&refine.model=${carModel}`)              
                    ]);

                const carOptions:React.JSX.Element[] = carDataResponse.data.facet_groups[2].facets?.map((year:any,i:number)=><option key = {i}>{year.name}</option>);
                setCarYearOptions(carOptions);
                    
                }

            }catch(err){
                console.error(err);
                toast.error(`${err}`);
            }
        }

        getCarData();

    },[carMake, carModel])

    function checkAppointmentDateTime():void{

        if(!date){
            toast.error("Pick a valid date");
            return;
        }

        const arrayOfDateAppt = date.split("T")[0].split("-");
        //military time
        const arrayOfTimeAppt = date.split("T")[1].split(":");

        const currentDate = new Date();

        //Checks if month/date/year of appointment is current/future date
        if(parseInt(arrayOfDateAppt[2]) < currentDate.getDate() || parseInt(arrayOfDateAppt[1]) < currentDate.getMonth()+1 || parseInt(arrayOfDateAppt[0]) < currentDate.getFullYear()){
            toast.error("Choose a current date or a date in the future.");
            return;
        }   

        const checkForSameDay = (parseInt(arrayOfDateAppt[2]) === currentDate.getDate() && parseInt(arrayOfDateAppt[1]) === currentDate.getMonth()+1 && parseInt(arrayOfDateAppt[0]) === currentDate.getFullYear())

        //Checks if time of appointment is current/future time
        if(parseInt(arrayOfTimeAppt[0]) < currentDate.getHours() && checkForSameDay){
            toast.error("Choose a current time or a time in the future.");
            return;
        }else if(parseInt(arrayOfTimeAppt[1])< currentDate.getMinutes() && checkForSameDay){
            toast.error("Choose a current time or a time in the future.");
            return;
        }

        //Checking for hours of operation

        // 7am - 5pm m - f, 7am -  3pm sat, sun closed

        const appointmentDayoFWeek = new Date(date);
        const daysOfWeek = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        const getAppointmentDayoFWeek = appointmentDayoFWeek.getDay();

        if(getAppointmentDayoFWeek === 0){
            toast.error("We are closed on Sundays");
            return;
        }else if((getAppointmentDayoFWeek >0 && getAppointmentDayoFWeek < 6) && (parseInt(arrayOfTimeAppt[0]) < 7 || parseInt(arrayOfTimeAppt[0]) > 17) && (parseInt(arrayOfTimeAppt[0]) >= 17 && parseInt(arrayOfTimeAppt[1])>=0)){
            toast.error("We are not open during those times");
            return;
        }else if(getAppointmentDayoFWeek === 6 && (parseInt(arrayOfTimeAppt[0]) < 7 || parseInt(arrayOfTimeAppt[0]) > 15) && (parseInt(arrayOfTimeAppt[0]) >= 15 && parseInt(arrayOfTimeAppt[1])>=0)){
            toast.error("We are not open during those times");
            return;
        }
     
        setDate(`${date}D${daysOfWeek[getAppointmentDayoFWeek]}`);
    }

    function handleCreateAppointment(){
        checkAppointmentDateTime();

        if(!carMake){
            toast.error("Please select a proper car make");
            return;
        }else if(!carModel){
            toast.error("Please select a proper car model");
            return;
        }else if(!carYear){
            toast.error("Please select a proper car year");
            return;
        }

        alert("Appointment Created")
    }

    return(
        <main>
            <h1>Make Reservation</h1>
            <form>
                <input
                type = "datetime-local"
                onChange = {(e)=>setDate(e.target.value)}
                />

                <select onChange = {(e)=>setCarMake(e.target.value)}>
                    <option defaultValue = "Select Car Make">Select Car Make</option>
                    {carMakeOptions}
                </select>

                <select onChange = {(e)=>setCarModel(e.target.value)}>
                <option defaultValue = "Select Car Model">Select Car Model</option>
                    {carModelOptions}
                </select>

                <select onChange = {(e)=>setCarYear(e.target.value)}>
                <option defaultValue = "Select Car Year">Select Car Year</option>
                    {carYearOptions}
                </select>

            </form>
            <Button
            text = "Reserve Appointment"
            handleButtonClick={()=> handleCreateAppointment()}/>
        </main>
    )
}