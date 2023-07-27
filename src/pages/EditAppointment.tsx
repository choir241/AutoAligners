import React, {useState, useMemo} from "react"
import Nav from "../components/Nav"
import {getAppointmentData, Appointment, DisplayTimeDateAppointments, GetCarData, SelectCarMakeInput, SelectCarModelInput, SelectCarYearInput, ChooseCarService, Input, TextBoxInput} from "../hooks/ReservationHooks"
import { EditChooseTwoInput, handleEditAppointment, checkDate, getEditAppointmentData } from "../hooks/EditAppointmentHooks"
import {Button} from "../components/Button"


export default function EditAppointment(){

    const [date, setDate] = useState<string>("");
    const [time, setTime] = useState<string>("");
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

    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [warning, setWarning] = useState<string>("");

    useMemo(()=>{
        GetCarData({onMakeSelect: setCarMakeOptions, onModelSelect: setCarModelOptions, onYearSelect: setCarYearOptions, carMake: carMake, carModel:carModel});

        getAppointmentData((e:Appointment[])=>setAppointments(e))

        getEditAppointmentData();

        checkDate(date, (e:string)=>setWarning(e));
    },[carMake, carModel, date]);
 
    const appointmentData = localStorage.getItem("editAppointmentData") as string;
    const data = JSON.parse(appointmentData);
        
    return(
        <main>
            <Nav/>

            <h1>Edit Appointment</h1>

            {warning ? <h2>{warning}</h2> : ""}

            <form>
{DisplayTimeDateAppointments({setTime: (e:string)=>setTime(e), appointments: appointments, setDate: (e:string)=>setDate(e), date: data.date, time: data.time})}

{SelectCarMakeInput({defaultValue: data.carMake, options: carMakeOptions, onChange: (e:string)=>setCarMake(e), carMake: carMake, carYear: carYear, carModel: carModel, resetModel: (e:string)=>setCarModel(e), resetYear:(e:string)=>setCarYear(e), resetMake:(e:string)=>setCarMake(e)})}
{SelectCarModelInput({defaultValue: data.carModel, options: carModelOptions, onChange: (e:string)=>setCarModel(e), carMake: carMake, carModel: carModel, carYear: carYear, resetModel:(e:string)=>setCarModel(e), resetYear: (e:string)=>setCarYear(e), resetMake:(e:string)=>setCarMake})}
{SelectCarYearInput({defaultValue: data.carYear, options: carYearOptions, onChange: (e:string)=>setCarYear(e), carMake: carMake, carModel: carModel, carYear: carYear, resetModel:(e:string)=>setCarModel(e),resetYear:(e:string)=>setCarYear(e),resetMake:(e:string)=>setCarMake(e)})}


{ChooseCarService((e:string)=>setService(e), data.service)}

{Input({type: "text", onChange: (e:string)=>setFirstName(e), placeholder: data.firstName, defaultValue: data.firstName})}
{Input({type: "text", onChange: (e:string)=>setLastName(e), placeholder: data.lastName, defaultValue: data.lastName})}
{Input({type: "text", onChange: (e:string)=>setEmail(e), placeholder: data.email, defaultValue: data.email})}
{Input({type: "tel", onChange: (e:string)=>setPhone(e), placeholder: data.phone, minlength: 10, maxlength: 10, defaultValue: data.phone})}
{Input({type: "text", onChange: (e:string)=>setZipCode(e), placeholder: data.zipCode, minlength: 5, maxlength: 5, defaultValue: data.zipCode})}

{EditChooseTwoInput({defaultValue: data.stayLeave, text1:"Wait for car",text2: "Drop off car",name: "stayLeave" ,onChange: (e:string)=>setStay_Leave(e)})}

<h2>Preferred Contact Method</h2>

{EditChooseTwoInput({defaultValue: data.contact, text1:"Email",text2: "Phone",name: "contact" ,onChange: (e:string)=>setContact(e)})}

{TextBoxInput({width: 50, height: 10, onChange: (e:string)=>setComment(e), placeholder: data.comment || "Additional Comments"})}

            </form>

            <Button
                text = "Edit Appointment"
                handleButtonClick={()=> handleEditAppointment(
                    {Appointment: {
                        service: service, 
                        firstName: firstName, 
                        lastName: lastName, 
                        date: date, 
                        time: time, 
                        carMake: carMake, 
                        carModel: carModel, 
                        carYear: carYear, 
                        email: email, 
                        phone: phone, 
                        zipCode: zipCode, 
                        contact: contact, 
                        comment: comment, 
                        stayLeave: stayLeave
                    }
                    }
                    )}/>

        </main>
    )
}