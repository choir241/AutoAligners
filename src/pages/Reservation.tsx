    import React, {useState, useMemo} from "react"
    import {Button} from "../components/Button"
    import {toast} from "react-toastify"
    import axios from "axios"

    interface Car{
        name: string
    };

    interface CarSelectData{
        onMakeSelect:(e:React.JSX.Element[])=>void,
        onModelSelect:(e:React.JSX.Element[])=>void,
        onYearSelect:(e:React.JSX.Element[])=>void,
        carMake: string,
        carModel: string,
    }

    interface SelectOptions{
        defaultValue:string,
        options:React.JSX.Element[],
        onChange: (e:string)=>void,
        resetModel: (e:string)=>void,
        resetYear: (e:string)=>void,
        resetMake: (e:string)=>void,
        carYear:string,
        carMake: string,
        carModel: string
    }

    export function SelectOptionsInput(props: SelectOptions):React.JSX.Element{

        const [previousCarModel, setPreviousCarModel] = useState<string>(props.carModel)
        const [previousCarMake, setPreviousCarMake] = useState<string>(props.carMake)
        const [previousCarYear, setPreviousCarYear] = useState<string>(props.carYear)

        return(
            <select onChange = {(e)=>{
                props.onChange(e.target.value)

                if(!previousCarMake){
                    setPreviousCarMake(e.target.value)
                }

                if(previousCarModel !== e.target.value){
                    setPreviousCarModel(e.target.value)
                }else if(previousCarMake !== e.target.value){
                    setPreviousCarMake(e.target.value)
                }else if(previousCarYear !== e.target.value){
                    setPreviousCarYear(e.target.value)
                }

                }}>
                <option defaultValue = "default">Select {props.defaultValue}</option>
                {props.options}
            </select>
        )
    };

    export function Input(type:string,onChange:(e:string)=>void,placeholder?:string, minlength?:number, maxlength?:number):React.JSX.Element{
        return(
            <input
                type = {type}
                onChange = {(e)=>onChange(e.target.value)}
                placeholder = {placeholder}
                minLength = {minlength}
                maxLength = {maxlength}
            />
        )
    };

    export function ChooseInput(text: string, onChange:(e:string)=>void){
        return(
            <div>
                <input type = "radio" value = {text} onChange = {(e)=>onChange(e.target.value)}/>
                <label>{text}</label>
            </div>
        )
    };


    export async function GetCarData(props:CarSelectData){
        try{
            //sets form options to all car makes
            const [dataResponse] = await Promise.all([
                axios.get(`https://public.opendatasoft.com/api/records/1.0/search/?dataset=all-vehicles-model&q=&facet=make&facet=model&facet=year`)
            ])

            const carOptions:React.JSX.Element[] = dataResponse?.data?.facet_groups[0]?.facets?.map((make:Car,i:number)=><option key = {i}>{make.name}</option>);
            const makeSelect = ()=>props.onMakeSelect(carOptions)
            makeSelect();

            if(props.carMake && props.carMake !== "Select Car Make"){
                //sets form options to all car models available for car make
                const [carDataResponse] = await Promise.all([
                    axios.get(`https://public.opendatasoft.com/api/records/1.0/search/?dataset=all-vehicles-model&q=&facet=make&facet=model&facet=year&refine.make=${props.carMake}`)              
                ]);

                const carOptions:React.JSX.Element[] = carDataResponse?.data?.facet_groups[1]?.facets?.map(function(model:Car,i:number){return <option key = {i}>{model.name}</option>});
            const modelSelect = ()=>props.onModelSelect(carOptions)
            modelSelect();
            }

            if(props.carMake && props.carModel && (props.carMake !== "Select Car Make") && (props.carModel !== "Select Car Model")){
                //sets form options to all car years available for car make and car models
                const [carDataResponse] = await Promise.all([
                    axios.get(`https://public.opendatasoft.com/api/records/1.0/search/?dataset=all-vehicles-model&q=&facet=make&facet=model&facet=year&refine.make=${props.carMake}&refine.model=${props.carModel}`)              
                ]);

                const carOptions:React.JSX.Element[] = carDataResponse?.data?.facet_groups[2]?.facets?.map((year:Car,i:number)=><option key = {i}>{year.name}</option>);
            const yearSelect = ()=>props.onYearSelect(carOptions)
            yearSelect();
            }

        }catch(err){
            console.error(err);
            toast.error(`${err}`);
            return;
        }
    };

    export function ChooseCarService(onChange:(e:string)=>void){
        try{
            const services = ["Oil Change","Brakes","Tire Purchase/Installation","Tire Services","Vehicle Inspection","Check Engine Light","Air Conditioning","Batteries Starting & Charging","Belts & Hoses","Engine","Exhaust","Fuel Systems","Heating & Cooling","Routine Maintenance","Steering Suspension Alignment","Transmission","Other"];

            const serviceOptions = services.map((service:string,i:number)=><option key = {i}>{service}</option>);

            return(
                <select onChange = {(e)=>onChange(e.target.value)}>
                    <option defaultValue = "default">Choose Service For Your Car</option>
                    {serviceOptions}
                </select>
            )
        }catch(err){
            console.error(err);
            toast.error(`${err}`);
        }
    }


    export default function Reservation(){

        //<>
        //1. choose appointment date
        //1.1 date/time cannot be set before current time/date
        //1.2 date/time must be respective to hours of car maintainence operation
        //1.3 date/time cannot be selected if appoinment for time/date already exists (involves database)
        //2. choose car model
        //2.1 car model info comes from API
        //2.2 if car make is selected (toyota/honda), model must match the only ones available to that brand
        //2.3 if car make is changed while model and year have been selected, select options need to reset for both year and model
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
        const [firstName, setFirstName] = useState<string>("");
        const [lastName, setLastName] = useState<string>("");
        const [email, setEmail] = useState<string>("");
        const [phone, setPhone] = useState<string>("");
        const [zipCode, setZipCode] = useState<string>("");
        const [contact, setContact] = useState<string>("");

        const [carMakeOptions, setCarMakeOptions] = useState<React.JSX.Element[]>([]);
        const [carModelOptions, setCarModelOptions] = useState<React.JSX.Element[]>([]);
        const [carYearOptions, setCarYearOptions] = useState<React.JSX.Element[]>([]);    
        const [stayLeave, setStay_Leave] = useState<string>("");
        const [service, setService] = useState<string>("");

        useMemo(()=>{
            GetCarData({onMakeSelect: setCarMakeOptions, onModelSelect: setCarModelOptions, onYearSelect: setCarYearOptions, carMake: carMake, carModel:carModel});
        },[carMake, carModel]);
        

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

            //Checking for hours of operation and make sure appointment day/time matches hours of operation
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

            if(!date){
                return;
            }else if(!carMake || carMake === "Select Car Make"){
                toast.error("Please select a proper car make");
                return;
            }else if(!carModel || carModel === "Select Car Model"){
                toast.error("Please select a proper car model");
                return;
            }else if(!carYear || carYear === "Select Car Year"){
                toast.error("Please select a proper car year");
                return;
            }else if(!stayLeave){
                toast.error("Please pick between dropping off your car and waiting for it");
                return;
            }else if(!service || service === "Choose Service For Your Car"){
                toast.error("Please Pick a valid Car Service");
                return;
            }else if(!firstName || !lastName){
                toast.error("Please input your name");
                return;
            }else if(!email){
                toast.error("Please input your email");
                return;
            }else if(!phone){
                toast.error("Please input your phone number");
                return;
            }else if(!zipCode){
                toast.error("Please input your zip code!");
                return;
            }else if(!contact){
                toast.error("Please choose preferred contact method");
                return;
            }

            alert("Appointment Made!");

            console.log(date)
            console.log(carMake)
            console.log(carModel)
            console.log(carYear) 
            console.log(stayLeave)
            console.log(service)
            console.log(firstName)
            console.log(lastName)
            console.log(email)
            console.log(phone)
            console.log(zipCode)
            console.log(contact)
        }

        return(
            <main>
                <h1>Make Reservation</h1>

                <form>

                    {Input("datetime-local",(e:string)=>setDate(e))}

                    {SelectOptionsInput({defaultValue: "Car Make", options: carMakeOptions, onChange: (e:string)=>setCarMake(e), carMake: carMake, carYear: carYear, carModel: carModel, resetModel: (e:string)=>setCarModel(e), resetYear:(e:string)=>setCarYear(e), resetMake:(e:string)=>setCarMake(e)})}
                    {SelectOptionsInput({defaultValue: "Car Model", options: carModelOptions, onChange: (e:string)=>setCarModel(e), carMake: carMake, carModel: carModel, carYear: carYear, resetModel:(e:string)=>setCarModel(e), resetYear: (e:string)=>setCarYear(e), resetMake:(e:string)=>setCarMake})}
                    {SelectOptionsInput({defaultValue: "Car Year", options: carYearOptions, onChange: (e:string)=>setCarYear(e), carMake: carMake, carModel: carModel, carYear: carYear, resetModel:(e:string)=>setCarModel(e),resetYear:(e:string)=>setCarYear(e),resetMake:(e:string)=>setCarMake(e)})}

                    {ChooseInput("Drop off car", (e:string)=>setStay_Leave(e))}
                    {ChooseInput("Wait for car", (e:string)=>setStay_Leave(e))}

                    {ChooseCarService((e:string)=>setService(e))}

                    {Input("text",(e:string)=>setFirstName(e),"First Name")}
                    {Input("text",(e:string)=>setLastName(e),"Last Name")}
                    {Input("text",(e:string)=>setEmail(e),"Email Address")}
                    {Input("tel",(e:string)=>setPhone(e),"###-###-####", 10, 10)}
                    {Input("text",(e:string)=>setZipCode(e),"Postal/Zip Code")}

                    Preferred Contact Method

                    {ChooseInput("Email", (e:string)=>setContact(e))}
                    {ChooseInput("Phone", (e:string)=>setContact(e))}

                </form>

                
                    <Button
                    text = "Reserve Appointment"
                    handleButtonClick={()=> handleCreateAppointment()}/>

            </main>
        )
    }