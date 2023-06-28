    import React, {useState, useMemo} from "react"
    import {Button} from "../components/Button"
    import {toast} from "react-toastify"
    import axios from "axios"
    import api from "../api/api"
    import { Permission, Role } from "appwrite"


    declare global {
        namespace NodeJS {
          interface ProcessEnv {
            REACT_APP_COLLECTION_ID: string;
            REACT_APP_DATABASE_ID: string;
            NODE_ENV: 'development' | 'production';
            PORT?: string;
            PWD: string;
          }
        }
      }

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

    interface TextBox{
        height: number,
        width: number,
        onChange:(e:string)=>void,
        placeholder: string
    }

    interface GeneralInput{
        type: string,
        onChange: (e:string)=>void,
        placeholder?: string,
        minlength?: number,
        maxlength?: number
    }

    interface Appointment{
        date: string,
        carModel: string,
        carMake: string,
        carYear: string,
        firstName: string,
        lastName: string,
        email: string,
        phone: string,
        zipCode: string,
        contact: string,
        comment: string,
        stayLeave: string,
        service: string
    }

    export function TextBoxInput(props: TextBox):React.JSX.Element{
        return(
            <textarea rows = {props.height} cols = {props.width} spellCheck = {true} wrap = "hard" onChange={(e)=>props.onChange(e.target.value)} placeholder={props.placeholder} />
        )
    }

    export function SelectCarMakeInput(props: SelectOptions):React.JSX.Element{
        const [previousCarMake, setPreviousCarMake] = useState<string>(props.carMake)

        return(
            <select onChange = {(e)=>{
                props.onChange(e.target.value)

                //checks for empty string value for previousCarMake state
                if(!previousCarMake){
                    setPreviousCarMake(e.target.value);
                }

                //checks if the previousCarMake value is not the same as the current value selected (checks if user changes carMake value)
                if(previousCarMake !== e.target.value){
                    //resets model and year values to account for changed carMake value
                    props.resetModel("");
                    props.resetYear("");
                    //we don't want to reset make, as that would defeat the purpose of selecting new values

                    //set previous previousCarMake value to the new current value selected
                    setPreviousCarMake(e.target.value);
                }

                }}>
                <option defaultValue = "default">Select {props.defaultValue}</option>
                {props.options}
            </select>
        )
    }

    export function SelectCarModelInput(props: SelectOptions):React.JSX.Element{
        const [previousCarModel, setPreviousCarModel] = useState<string>(props.carModel)

        return(
            <select onChange = {(e)=>{
                props.onChange(e.target.value)

                //checks for empty string value for previousCarModel state
                if(!previousCarModel){
                    setPreviousCarModel(e.target.value);
                }
      
                //checks if the previousCarModel value is not the same as the current value selected (checks if user changes carModel value)
                if(previousCarModel !== e.target.value){
                    //resets year value to account for changed carModel value
                    props.resetYear("");
                    //we don't want to reset model/make, as that would defeat the purpose of selecting new values
                    setPreviousCarModel(e.target.value)
                }

                }}>
                <option defaultValue = "default">Select {props.defaultValue}</option>
                {props.options}
            </select>
        )
    }

    export function SelectCarYearInput(props: SelectOptions):React.JSX.Element{
        return(
            //changing year value does not directly effect carMake and/or carModel, so there is no need to check if value has changed
            <select onChange = {(e)=>props.onChange(e.target.value)}>
                <option defaultValue = "default">Select {props.defaultValue}</option>
                {props.options}
            </select>
        )

    }

    export function Input(props: GeneralInput):React.JSX.Element{
        return(
            <input
                type = {props.type}
                onChange = {(e)=>props.onChange(e.target.value)}
                placeholder = {props.placeholder}
                minLength = {props.minlength}
                maxLength = {props.maxlength}
            />
        )
    };

    export function ChooseTwoInput(text1: string, text2:string, name: string, onChange:(e:string)=>void){
        return(
            <div>
                <input type = "radio" value = {text1} name = {name} onChange = {(e)=>onChange(e.target.value)}/>
                <label>{text1}</label> 

                <input type = "radio" value = {text2} name = {name} onChange = {(e)=>onChange(e.target.value)}/>
                <label>{text2}</label> 
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
        const [comment, setComment] = useState<string>("");

        const [carMakeOptions, setCarMakeOptions] = useState<React.JSX.Element[]>([]);
        const [carModelOptions, setCarModelOptions] = useState<React.JSX.Element[]>([]);
        const [carYearOptions, setCarYearOptions] = useState<React.JSX.Element[]>([]);    
        const [stayLeave, setStay_Leave] = useState<string>("");
        const [service, setService] = useState<string>("");

        useMemo(()=>{
            GetCarData({onMakeSelect: setCarMakeOptions, onModelSelect: setCarModelOptions, onYearSelect: setCarYearOptions, carMake: carMake, carModel:carModel});
        },[carMake, carModel]);
        

        function checkAppointmentDateTime(e:string):string | void{

            if(!e){
                toast.error("Pick a valid date");
                return;
            }

            const arrayOfDateAppt = e.split("T")[0].split("-");
            //military time
            const arrayOfTimeAppt = e.split("T")[1].split(":");

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

            const appointmentDayoFWeek = new Date(e);
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

            setDate(`${date}D${daysOfWeek[getAppointmentDayoFWeek]}`)
                }

        function checkInputValidation():false|undefined{
            if(!date){
                return false;
            }else if(!carMake || carMake === "Select Car Make"){
                toast.error("Please select a proper car make");
                return false;
            }else if(!carModel || carModel === "Select Car Model"){
                toast.error("Please select a proper car model");
                return false;
            }else if(!carYear || carYear === "Select Car Year"){
                toast.error("Please select a proper car year");
                return false;
            }else if(!stayLeave){
                toast.error("Please pick between dropping off your car and waiting for it");
                return false;
            }else if(!service || service === "Choose Service For Your Car"){
                toast.error("Please Pick a valid Car Service");
                return false;
            }else if(!firstName || !lastName){
                toast.error("Please input your name");
                return false;
            }else if(!email){
                toast.error("Please input your email");
                return false;
            }else if(!phone){
                toast.error("Please input your phone number");
                return false;
            }else if(!zipCode){
                toast.error("Please input your zip code!");
                return false;
            }else if(!contact){
                toast.error("Please choose preferred contact method");
                return false;
            }

            const name = /^[A-Za-z]+$/;
            const mail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

            if(!name.test(firstName) || !name.test(lastName)){
                toast.error("Please input a valid name");
                return false;
            }else if(!mail.test(email)){
                toast.error('Please input a valid email');
                return false;
            }

            alert("Appointment Made!");

            handleSubmitData();
        }

        async function handleSubmitData():Promise<void>{             

            const formData = {
                "date":date,
                "carMake":carMake,
                "carYear":carYear,
                "carModel":carModel,
                "stayLeave":stayLeave,
                "service":service,
                "firstName":firstName,
                "lastName":lastName,
                "email":email,
                "phone":phone,
                "zipCode":zipCode,
                "contact":contact,
                "comment":comment
            }


            await api.createDocument(process.env.REACT_APP_DATABASE_ID, process.env.REACT_APP_COLLECTION_ID, formData,   [
                Permission.read(Role.any())])

        }

        function handleCreateAppointment():void{            
            if(!checkInputValidation()){
                return;
            }

            handleSubmitData();
        }

        async function getData(){
            try{
                const data = await api.listDocuments(process.env.REACT_APP_DATABASE_ID, process.env.REACT_APP_COLLECTION_ID)

                console.log(data.documents)
                const checkExistingAppt:[] = data.documents.find((appt:Appointment)=>{
                    console.log(date)
                    console.log(appt.date)
                })
                console.log(checkExistingAppt);
    
            }catch(err){    
                console.error(err);
            }
        }

        return(
            <main>
                <h1>Make Reservation</h1>

                <button onClick = {()=>getData()}>getData</button>

                <form>
                    {Input({type: "datetime-local", onChange: (e:string)=>{setDate(e)}})}


                    {SelectCarMakeInput({defaultValue: "Car Make", options: carMakeOptions, onChange: (e:string)=>setCarMake(e), carMake: carMake, carYear: carYear, carModel: carModel, resetModel: (e:string)=>setCarModel(e), resetYear:(e:string)=>setCarYear(e), resetMake:(e:string)=>setCarMake(e)})}
                    {SelectCarModelInput({defaultValue: "Car Model", options: carModelOptions, onChange: (e:string)=>setCarModel(e), carMake: carMake, carModel: carModel, carYear: carYear, resetModel:(e:string)=>setCarModel(e), resetYear: (e:string)=>setCarYear(e), resetMake:(e:string)=>setCarMake})}
                    {SelectCarYearInput({defaultValue: "Car Year", options: carYearOptions, onChange: (e:string)=>setCarYear(e), carMake: carMake, carModel: carModel, carYear: carYear, resetModel:(e:string)=>setCarModel(e),resetYear:(e:string)=>setCarYear(e),resetMake:(e:string)=>setCarMake(e)})}

                    {ChooseTwoInput("Drop off car", "Wait for car", "stayLeave", (e:string)=>setStay_Leave(e))}

                    {ChooseCarService((e:string)=>setService(e))}

                    {Input({type: "text",onChange: (e:string)=>setFirstName(e),placeholder: "First Name"})}
                    {Input({type: "text",onChange: (e:string)=>setLastName(e),placeholder: "Last Name"})}
                    {Input({type: "text",onChange: (e:string)=>setEmail(e),placeholder: "Email Address"})}
                    {Input({type: "tel",onChange: (e:string)=>setPhone(e),placeholder: "###-###-####", minlength: 10, maxlength: 10})}
                    {Input({type: "text",onChange: (e:string)=>setZipCode(e),placeholder: "Postal/Zip Code", minlength: 5, maxlength: 5})}

                    Preferred Contact Method

                    {ChooseTwoInput("Email", "Phone", "contact" ,(e:string)=>setContact(e))}

                    {TextBoxInput({width: 50, height: 10, onChange: (e:string)=>setComment(e), placeholder: "Additional Comments"})}

                </form>

                
                    <Button
                    text = "Reserve Appointment"
                    handleButtonClick={()=> handleCreateAppointment()}/>

            </main>
        )
    }