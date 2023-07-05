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

interface Date{
    type: string,
    onChange: (e:React.ChangeEvent<HTMLInputElement>) => void
}

export function DateInput(props: Date):React.JSX.Element{
    return(
        <input
            type = {props.type}
            onChange = {(e)=>props.onChange(e)}
        />
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

