import React, {useState} from "react"
import {toast} from "react-toastify"
import {carData} from "../api/data"
import api from "../api/api"
import { Permission, Role } from "appwrite"

//globally accessible env variables
declare global {
    namespace NodeJS {
      export interface ProcessEnv {
        REACT_APP_COLLECTION_ID: string;
        REACT_APP_DATABASE_ID: string;
        REACT_APP_PROJECT: string;
        REACT_APP_CAR_API_KEY: string;
        REACT_APP_ENDPOINT: string;
        NODE_ENV: "development" | "production";
        PORT?: string;
        PWD: string;
      }
    }
}

//interface type for Car type
export interface Car{
    id_: number,
    manufacturer: string,
    model: string,
    year: number,
    vin: string
};

//interface type for selecting car data (model, year, make)
export interface CarSelectData{
    onMakeSelect: (e:React.JSX.Element[])=>void,
    onModelSelect: (e:React.JSX.Element[])=>void,
    onYearSelect: (e:React.JSX.Element[])=>void,
    carMake: string,
    carModel: string
}

//interface type for resetting car make/car year/and car model values
export interface SelectOptions{
    defaultValue: string,
    options: React.JSX.Element[],
    onChange: (e:string)=>void,
    resetModel: (e:string)=>void,
    resetYear: (e:string)=>void,
    resetMake: (e:string)=>void,
    carYear:string,
    carMake: string,
    carModel: string
}

//interface type for comment input
export interface TextBox{
    height: number,
    width: number,
    onChange: (e:string)=>void,
    placeholder: string
}

//interface type for general inputs
export interface GeneralInput{
    type: string,
    onChange: (e:string)=>void,
    placeholder?: string,
    minlength?: number,
    maxlength?: number,
    value?: string
}

export interface ChooseTwoInput{
    text1: string, 
    text2:string, 
    name: string, 
    onChange:(e:string)=>void
}

//interface type for appointments
export interface Appointment{
    date: string,
    time: string,
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
        <textarea 
            rows = {props.height} 
            cols = {props.width} 
            spellCheck = {true} 
            wrap = "hard" 
            onChange={(e)=>props.onChange(e.target.value)} 
            placeholder={props.placeholder} 
        />
    )
}

export function SelectCarMakeInput(props: SelectOptions):React.JSX.Element{

    //sets value for previously selected car make 
    const [previousCarMake, setPreviousCarMake] = useState<string>(props.carMake);

    return(
        <select onChange = {(e)=>{
            props.onChange(e.target.value);

            //checks for empty string value for previousCarMake state
            if(!previousCarMake){
                setPreviousCarMake(e.target.value);
            };

            //checks if the previousCarMake value is not the same as the current value selected (checks if user changes carMake value)
            if(previousCarMake !== e.target.value){
                //resets model and year values to account for changed carMake value
                //we don't want to reset make, as that would defeat the purpose of selecting new values
                props.resetModel("");
                props.resetYear("");

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

    //sets value for previously selected car model
    const [previousCarModel, setPreviousCarModel] = useState<string>(props.carModel);

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
            value = {props.value}
            type = {props.type}
            onChange = {(e)=>props.onChange(e.target.value)}
            placeholder = {props.placeholder}
            minLength = {props.minlength}
            maxLength = {props.maxlength}
        />
    )
}

export function ChooseTwoInput(props: ChooseTwoInput){
    return(
        <div>
            <input type = "radio" value = {props.text1} name = {props.name} onChange = {(e)=>props.onChange(e.target.value)}/>
            <label>{props.text1}</label> 

            <input type = "radio" value = {props.text2} name = {props.name} onChange = {(e)=>props.onChange(e.target.value)}/>
            <label>{props.text2}</label> 
        </div>
    )
};

export async function GetCarData(props:CarSelectData){
        try{

            // sets form options to all car makes
            const carOptions:React.JSX.Element[] = carData.map((car:Car,i:number)=><option key = {i}>{car.manufacturer}</option>);
            //onMakeSelect is a setState() here, so we make it a separate function here to prevent re-rendering
            const makeSelect = ()=>props.onMakeSelect(carOptions);
            makeSelect();

            if(props.carMake && props.carMake !== "Select Car Make"){

                //sets form options to all car models available for selected car make value
                const response = carData.filter((car:Car)=>{
                    let model = ""
                    if(car.manufacturer === props.carMake){
                        model = car.model
                    }
                    return model
                })

                //returns a new array of react jsx element with new car model values that are respective to selected car make value
                const carOptions:React.JSX.Element[] = response.map(function(car:Car,i:number){return <option key = {i}>{car.model}</option>});
                const modelSelect = ()=>props.onModelSelect(carOptions)
                modelSelect();
            }

            if(props.carMake && props.carModel && (props.carMake !== "Select Car Make") && (props.carModel !== "Select Car Model")){
                //sets form options to all car years available for car make and car models
                const response = carData.filter((car:Car, i:number)=>{
                    let year = 0
                    if(car.manufacturer === props.carMake && car.model === props.carModel){
                        year = car.year
                    }
                    return year
                })

                //returns a new array of react jsx element with new car year values that are respective to selected car make & model value
                const carOptions:React.JSX.Element[] = response.map((car:Car,i:number)=><option key = {i}>{car.year}</option>);
                const yearSelect = ()=>props.onYearSelect(carOptions);
                yearSelect();
            }

        }catch(err){
            console.error(err);
            toast.error(`${err}`);
        }
}

export function ChooseCarService(onChange:(e:string)=>void){
    try{
        //list of all available car services
        const services = ["Oil Change","Brakes","Tire Purchase/Installation","Tire Services","Vehicle Inspection","Check Engine Light","Air Conditioning","Batteries Starting & Charging","Belts & Hoses","Engine","Exhaust","Fuel Systems","Heating & Cooling","Routine Maintenance","Steering Suspension Alignment","Transmission","Other"];

        //returns a new array of react jsx elements with all available car services
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


function handleChangeTime(e:React.MouseEvent<HTMLButtonElement, MouseEvent>, time:string, setTime: (e:string)=>void){
    e.preventDefault();
    setTime(time)
}

export function DisplayTimeAppointments(setTime: (e:string)=>void, appointments: Appointment[], setDate: (e:string)=>void):React.JSX.Element{

    const date = new Date();
    //+1 because Date.prototype.getMonth() starts at 0 to represent index
    let month:number = date.getMonth()+1;
    let dayOfWeek:number = date.getDay();
    let year:number = date.getFullYear();
    let day:number = date.getDate();
    
    //list of days in a week
    const daysOfWeek = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    const appt:React.JSX.Element[] = [];

    // const object:{date: string, [time: string]} = {}

    //takes the appointments array of objects, and converts it into an object where 
    let appointmentDays = appointments.map((appointment:Appointment)=>{
            const appointmentDate = appointment.date;
            const appointmentTime = appointment.time;

            // object[appointmentDate] = {["time"] = appointmentTime}
          

    })


    for(let i = 0; i < 8; i++){

        let currentMonth = month;
        let currentDay = day;
        let currentYear =year;
        let currentDayOfWeek = dayOfWeek

        switch(month){
            case 1:
            case 3:
            case 5:
            case 7:
            case 8:
            case 10:
                if(currentDay > 31){
                    currentDay = 1;
                    currentMonth += 1;
                }
                break;
            case 4:
            case 6:
            case 9:
            case 11:
                if(currentDay > 30){
                    currentDay = 1;
                    currentMonth += 1;
                }
                break;
            case 2:
                if(currentDay > 28){
                    currentDay = 1;
                    currentMonth += 1;
                }
                break;
            case 12:
                if(currentDay > 31){
                    currentDay = 1;
                    currentMonth = 1;
                    currentYear += 1;
                }
                break;
        }


        if(currentDayOfWeek > 6){
            dayOfWeek = 0;
            currentDayOfWeek = 0
        }

        appt.push(
            <div className = {`calendar clearButton c-${i}`} key = {`c-${i}`} onClick = {()=>{
                const date = `${currentMonth}/${currentDay}/${currentYear}D${daysOfWeek[currentDayOfWeek]}`
                setDate(date);
                    document.querySelectorAll(".calendar").forEach(ele=>{
                        ele.classList.remove("clicked")
                    });

                    document.querySelector(`.c-${i}`)?.classList.add("clicked");
            }}>
                <h3>{daysOfWeek[currentDayOfWeek]}</h3>
                <h3>{`${month}/${day}/${year}`}</h3>
            </div>
        )

        day++;
        dayOfWeek++;

    }
    
        // 7am - 3pm sat 
        // 7am - 5pm mon-fri


        //go through all objects in appointments array
        //check if appointments[index].time exists, if it does, remove that time ONLY if it matches that specific date


        let jsx = []

        let minutes = 0;
     

        //times at :00 mark
        for(let time = 7; time <= 17; time++){
            
                let hourString:string = time.toString()
                let minuteString:string = minutes.toString()
                jsx.push(hourString + ":" + minuteString + "0");
         
        }


        const sortedJSX = jsx.sort((a,b)=>parseInt(a)-parseInt(b));
        const miliaryTimeConversion = sortedJSX.map(ele=>{
            if(parseInt(ele)>12){
                const hours = ele.split(":")[0];
                const minutes = ele.split(":")[1];
                return [(parseInt(hours) - 12).toString() + ":" + minutes + "PM", ele]
            }else if(parseInt(ele) === 12){
                const hours = ele.split(":")[0];
                const minutes = ele.split(":")[1];
                return [(parseInt(hours)).toString() + ":" + minutes + "PM", ele]
            }else{
                const hours = ele.split(":")[0];
                const minutes = ele.split(":")[1];
                return [(parseInt(hours)).toString() + ":" + minutes + "AM", ele]
            }
        })

        const finalJSX = miliaryTimeConversion.map((jsx,i)=>{return(
                   <button 
                         className = {`clearButton t-${i} time`} key = {i}
                         onClick = {(e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
                             e.preventDefault();
                             handleChangeTime(e, jsx[1], (e:string)=>setTime(e))
                            
                             document.querySelectorAll(".time").forEach(ele=>{
                                ele.classList.remove("clicked")
                            });
    
                            document.querySelector(`.t-${i}`)?.classList.add("clicked");
                            }}>
                             {jsx[0]}
                    </button>
        )
    })


        return(
            <section>
                
                <section className = "calendarHub flex">
                    {appt}
                </section>

                <section className = "appointmentTimes flex">
                    {finalJSX}
                </section>
            </section>
        )

}

export function Calendar(setDate: (e:string)=>void){
    const date = new Date();
    let month:number = date.getMonth()+1;
    let dayOfWeek:number = date.getDay();
    let year:number = date.getFullYear();
    let day:number = date.getDate();

    const daysOfWeek = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    const appt:React.JSX.Element[] = [];

    for(let i = 0; i < 8; i++){

        let currentMonth = month;
        let currentDay = day;
        let currentYear =year;
        let currentDayOfWeek = dayOfWeek

        switch(month){
            case 1:
            case 3:
            case 5:
            case 7:
            case 8:
            case 10:
                if(currentDay > 31){
                    currentDay = 1;
                    currentMonth += 1;
                }
                break;
            case 4:
            case 6:
            case 9:
            case 11:
                if(currentDay > 30){
                    currentDay = 1;
                    currentMonth += 1;
                }
                break;
            case 2:
                if(currentDay > 28){
                    currentDay = 1;
                    currentMonth += 1;
                }
                break;
            case 12:
                if(currentDay > 31){
                    currentDay = 1;
                    currentMonth = 1;
                    currentYear += 1;
                }
                break;
        }

        

        if(currentDayOfWeek > 6){
            dayOfWeek = 0;
            currentDayOfWeek = 0
        }

                  
        appt.push(
            <div className = {`calendar clearButton c-${i}`} key = {`c-${i}`} onClick = {()=>{
                const date = `${currentMonth}/${currentDay}/${currentYear}D${daysOfWeek[currentDayOfWeek]}`
                setDate(date);
                    document.querySelectorAll(".calendar").forEach(ele=>{
                        ele.classList.remove("clicked")
                    });

                    document.querySelector(`.c-${i}`)?.classList.add("clicked");
            }}>
                <h3>{daysOfWeek[currentDayOfWeek]}</h3>
                <h3>{`${month}/${day}/${year}`}</h3>
            </div>
        )

        day++;
        dayOfWeek++;

    }


    return(
        <section className = "calendarHub flex">
            {appt}
        </section>
        )
}


export function checkAppointmentDate(date: string, time: string, setDate: (e:string)=>void):string | void{

    if(!date){
        toast.error("Pick a valid date");
        return;
    }

    if(!time){
        toast.error('Pick a valid time');
        return;
    }

    console.log(date)

    const arrayOfDateAppt = date.split("D")[0].split("/");
    let arrayOfTimeAppt = time.split(":");

    let militaryTime:string = arrayOfTimeAppt[0];

    if(arrayOfTimeAppt[1].includes("PM") && !arrayOfTimeAppt[0].includes("12")){
        militaryTime = (parseInt(arrayOfTimeAppt[0]) + 12).toString();
    }

    //military time

    const currentDate = new Date();

    //Checks if month/date/year of appointment is current/future date
    if(parseInt(arrayOfDateAppt[1]) < currentDate.getDate() || parseInt(arrayOfDateAppt[0]) < currentDate.getMonth()+1 || parseInt(arrayOfDateAppt[2]) < currentDate.getFullYear()){
        toast.error("Choose a current date or a date in the future.");
        return;
    }   

    //check if current month matches appointment month
    //check if current day matches appointment day
    //check if current year matches appointment year

    //check if appointment hours is less than the current hours value
    //check if current time has minutes, and if it does WHILE having the hours be less than the current hours value

    const checkForSameDay = ((currentDate.getMinutes() && parseInt(militaryTime) <= currentDate.getHours()) &&(parseInt(arrayOfDateAppt[1]) === currentDate.getDate()) && (parseInt(arrayOfDateAppt[0]) === currentDate.getMonth()+1) && (parseInt(arrayOfDateAppt[2]) === currentDate.getFullYear()))

    if(checkForSameDay){
        toast.error("Choose a current time or a time in the future.");
        return; 
    }


    const appointmentDayoFWeek = new Date(parseInt(date.split("/")[2]),parseInt(date.split("/")[0]),parseInt(date.split("/")[1]));
    const daysOfWeek = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const getAppointmentDayoFWeek = appointmentDayoFWeek.getDay();

    console.log(appointmentDayoFWeek)
    console.log(getAppointmentDayoFWeek)

    // if(getAppointmentDayoFWeek === 6){
    //     toast.error("We are closed on Sundays");
    //     return;
    // }else if(getAppointmentDayoFWeek === 5){
    //     toast.error("We are not open during those times");
    //     return;
    // }

    if(!daysOfWeek.includes(date.split("D")[1])){
        setDate(`${date}D${daysOfWeek[getAppointmentDayoFWeek]}`)
    }

}


export async function handleSubmitData(props: Appointment):Promise<void>{         
    
        console.log(props.date)

            const formData = {
                "date":props.date,
                "time":props.time,
                "carMake":props.carMake,
                "carYear":props.carYear,
                "carModel":props.carModel,
                "stayLeave":props.stayLeave,
                "service":props.service,
                "firstName":props.firstName,
                "lastName":props.lastName,
                "email":props.email,
                "phone":props.phone,
                "zipCode":props.zipCode,
                "contact":props.contact,
                "comment":props.comment
            }


            await api.createDocument(process.env.REACT_APP_DATABASE_ID, process.env.REACT_APP_COLLECTION_ID, formData, [Permission.read(Role.any())])

            window.location.reload();   
        }


export function checkInputValidation(props: Appointment):false|undefined{
            if(!props.date){
                toast.error("Please select a proper date");
                return false;
            }else if(!props.time){            
                toast.error("Please select an available time");
                return false;
            }else if(!props.carMake || props.carMake === "Select Car Make"){
                toast.error("Please select a proper car make");
                return false;
            }else if(!props.carModel || props.carModel === "Select Car Model"){
                toast.error("Please select a proper car model");
                return false;
            }else if(!props.carYear || props.carYear === "Select Car Year"){
                toast.error("Please select a proper car year");
                return false;
            }else if(!props.stayLeave){
                toast.error("Please pick between dropping off your car and waiting for it");
                return false;
            }else if(!props.service || props.service === "Choose Service For Your Car"){
                toast.error("Please Pick a valid Car Service");
                return false;
            }else if(!props.firstName || !props.lastName){
                toast.error("Please input your name");
                return false;
            }else if(!props.email){
                toast.error("Please input your email");
                return false;
            }else if(!props.phone){
                toast.error("Please input your phone number");
                return false;
            }else if(!props.zipCode){
                toast.error("Please input your zip code!");
                return false;
            }else if(!props.contact){
                toast.error("Please choose preferred contact method");
                return false;
            }

            const name = /^[A-Za-z]+$/;
            const mail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

            if(!name.test(props.firstName) || !name.test(props.lastName)){
                toast.error("Please input a valid name");
                return false;
            }else if(!mail.test(props.email)){
                toast.error('Please input a valid email');
                return false;
            }

            alert("Appointment Made!");

            handleSubmitData({service: props.service, firstName: props.firstName, lastName: props.lastName, date: props.date, time: props.time, carModel: props.carModel, carMake: props.carMake, carYear: props.carYear, email: props.email, phone: props.phone, zipCode: props.zipCode, contact: props.contact, comment: props.comment, stayLeave:props.stayLeave});
 }


export async function getAppointmentData(setAppointments: (e:Appointment[])=>void){
    try{
        const data = await api.listDocuments(process.env.REACT_APP_DATABASE_ID, process.env.REACT_APP_COLLECTION_ID)
        setAppointments(data.documents);
    }catch(err){
        console.error(err);
        toast.error(`${err}`);
    }
}