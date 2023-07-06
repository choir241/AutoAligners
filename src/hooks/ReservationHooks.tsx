import React, {useState} from "react"
import {toast} from "react-toastify"
import {carData} from "../api/data"

declare global {
    namespace NodeJS {
      export interface ProcessEnv {
        REACT_APP_COLLECTION_ID: string;
        REACT_APP_DATABASE_ID: string;
        REACT_APP_PROJECT: string;
        REACT_APP_CAR_API_KEY: string;
        NODE_ENV: 'development' | 'production';
        PORT?: string;
        PWD: string;
      }
    }
  }


export interface Car{
    id_: number,
    manufacturer: string,
    model: string,
    year: number,
    vin: string
};

export interface CarSelectData{
    onMakeSelect:(e:React.JSX.Element[])=>void,
    onModelSelect:(e:React.JSX.Element[])=>void,
    onYearSelect:(e:React.JSX.Element[])=>void,
    carMake: string,
    carModel: string,
}

export interface SelectOptions{
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

export interface TextBox{
    height: number,
    width: number,
    onChange:(e:string)=>void,
    placeholder: string
}

export interface GeneralInput{
    type: string,
    onChange: (e:string)=>void,
    placeholder?: string,
    minlength?: number,
    maxlength?: number,
    value?: string
}

export interface Appointment{
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
            value = {props.value}
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
            // sets form options to all car makes
    
            const carOptions:React.JSX.Element[] = carData.map((car:Car,i:number)=><option key = {i}>{car.manufacturer}</option>);
            const makeSelect = ()=>props.onMakeSelect(carOptions)
            makeSelect();

            if(props.carMake && props.carMake !== "Select Car Make"){
                //sets form options to all car models available for car make

                const response = carData.filter((car:Car, i:number)=>{
                    let model = ""
                    if(car.manufacturer === props.carMake){
                        model = car.model
                    }
                    return model
                })

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

                const carOptions:React.JSX.Element[] = response.map((car:Car,i:number)=><option key = {i}>{car.year}</option>);
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


function handleChangeTime(e:React.MouseEvent<HTMLButtonElement, MouseEvent>, time:string, setTime: (e:string)=>void){
    e.preventDefault();
    setTime(time)
}

export function DisplayTimeAppointments(setTime: (e:string)=>void):React.JSX.Element{
        // 7am - 3pm sat 
        // 7am - 5pm mon-fri

        let jsx = []

        let minutes = 0;

        //times at :00 mark
        for(let time = 7; time <= 17; time++){
                let hourString:string = time.toString()
                let minuteString:string = minutes.toString()
                jsx.push(hourString + ":" + minuteString + "0");
      
        }


        //times at :30 mark
        for(let time = 7; time < 17; time++){
            const min = 30
                let hourString:string = time.toString()
                let minuteString:string = min.toString()
                jsx.push(hourString += ":" + minuteString)
        }   

        const sortedJSX = jsx.sort((a,b)=>parseInt(a)-parseInt(b));
        const miliaryTimeConversion = sortedJSX.map(ele=>{
            if(parseInt(ele)>12){
                const hours = ele.split(":")[0];
                const minutes = ele.split(":")[1];
                return (parseInt(hours) - 12).toString() + ":" + minutes + "PM"
            }else if(parseInt(ele) === 12){
                const hours = ele.split(":")[0];
                const minutes = ele.split(":")[1];
                return (parseInt(hours)).toString() + ":" + minutes + "PM"
            }else{
                const hours = ele.split(":")[0];
                const minutes = ele.split(":")[1];
                return (parseInt(hours)).toString() + ":" + minutes + "AM"
            }
        })

        const finalJSX = miliaryTimeConversion.map((jsx,i)=>{return(
                   <button 
                         className = {`clearButton t-${i} time`} key = {i}
                         onClick = {(e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
                             e.preventDefault();
                             handleChangeTime(e, jsx, (e:string)=>setTime(e))
                            
                             document.querySelectorAll(".time").forEach(ele=>{
                                ele.classList.remove("clicked")
                            });
    
                            document.querySelector(`.t-${i}`)?.classList.add("clicked");
                            }}>
                             {jsx}
                    </button>
        )
    })


        return(
            <section className = "appointmentTimes flex">
                {finalJSX}
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
