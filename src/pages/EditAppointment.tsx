import React, {useState, useMemo} from "react"
import api from "../api/api"
import {toast} from "react-toastify"
import Nav from "../components/Nav"
import {checkAppointmentDate, getAppointmentData, Appointment, DisplayTimeDateAppointments, GetCarData, SelectCarMakeInput, SelectCarModelInput, SelectCarYearInput, ChooseCarService, Input, TextBoxInput} from "../hooks/ReservationHooks"
import { EditChooseTwoInput, ValidateEditInput } from "../hooks/EditAppointmentHooks"
import {Button} from "../components/Button"

export default function EditAppointment(){

    const [id, setId] = useState<string>("");
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

    useMemo(()=>{
        async function getAppointmentData(){
            try{
                const data = await api.listDocuments(process.env.REACT_APP_DATABASE_ID, process.env.REACT_APP_COLLECTION_ID)

                if(data.documents.length){
                    const findAppointmentData = data.documents.filter((appointment: Appointment)=>appointment.$id === localStorage.getItem("id"))
                    const appointment = findAppointmentData[0]
                    setId(appointment.$id)
                    setDate(appointment.date)
                    setTime(appointment.time)
                    setCarModel(appointment.carModel)
                    setCarMake(appointment.carMake)
                    setCarYear(appointment.carYear)
                    setFirstName(appointment.firstName)
                    setLastName(appointment.lastName)
                    setEmail(appointment.email)
                    setPhone(appointment.phone)
                    setZipCode(appointment.zipCode)
                    setContact(appointment.contact)
                    setComment(appointment.comment)
                    setStay_Leave(appointment.stayLeave)
                    setService(appointment.service)
                }

            }catch(err){
                console.error(err);
                toast.error(`${err}`);
            }
        }

        getAppointmentData()
    },[])

    useMemo(()=>{
        GetCarData({onMakeSelect: setCarMakeOptions, onModelSelect: setCarModelOptions, onYearSelect: setCarYearOptions, carMake: carMake, carModel:carModel});

        getAppointmentData((e:Appointment[])=>setAppointments(e))

    },[carMake, carModel]);

    async function handleEditAppointment(){
        try{
            checkAppointmentDate(date, time, (e:string)=>setDate(e))

            if(!ValidateEditInput({$id: id, service: service, firstName: firstName, lastName: lastName, date: date, time: time, carModel: carModel, carMake: carMake, carYear:carYear, email: email, phone: phone, zipCode: zipCode, contact: contact, comment: comment, stayLeave:stayLeave })){
                return;
            }

        }catch(err){
            console.error(err);
        }
    }
    
    return(
        <main>
            <Nav/>

            <h1>Edit Appointment</h1>

            <form>
{DisplayTimeDateAppointments({setTime: (e:string)=>setTime(e), appointments: appointments, setDate: (e:string)=>setDate(e)})}

{SelectCarMakeInput({defaultValue: carMake, options: carMakeOptions, onChange: (e:string)=>setCarMake(e), carMake: carMake, carYear: carYear, carModel: carModel, resetModel: (e:string)=>setCarModel(e), resetYear:(e:string)=>setCarYear(e), resetMake:(e:string)=>setCarMake(e)})}
{SelectCarModelInput({defaultValue: carModel, options: carModelOptions, onChange: (e:string)=>setCarModel(e), carMake: carMake, carModel: carModel, carYear: carYear, resetModel:(e:string)=>setCarModel(e), resetYear: (e:string)=>setCarYear(e), resetMake:(e:string)=>setCarMake})}
{SelectCarYearInput({defaultValue: carYear, options: carYearOptions, onChange: (e:string)=>setCarYear(e), carMake: carMake, carModel: carModel, carYear: carYear, resetModel:(e:string)=>setCarModel(e),resetYear:(e:string)=>setCarYear(e),resetMake:(e:string)=>setCarMake(e)})}

{EditChooseTwoInput({defaultValue: stayLeave, text1: "Drop off car",text2: "Wait for car",name: "stayLeave",onChange: (e:string)=>setStay_Leave(e)})}

{ChooseCarService((e:string)=>setService(e), service)}

{Input({type: "text", onChange: (e:string)=>setFirstName(e), placeholder: firstName, defaultValue: firstName})}
{Input({type: "text", onChange: (e:string)=>setLastName(e), placeholder: lastName, defaultValue: lastName})}
{Input({type: "text", onChange: (e:string)=>setEmail(e), placeholder: email, defaultValue: email})}
{Input({type: "tel", onChange: (e:string)=>setPhone(e), placeholder: phone, minlength: 10, maxlength: 10, defaultValue: phone})}
{Input({type: "text", onChange: (e:string)=>setZipCode(e), placeholder: zipCode, minlength: 5, maxlength: 5, defaultValue: zipCode})}

<h2>Preferred Contact Method</h2>

{EditChooseTwoInput({defaultValue: contact, text1:"Email",text2: "Phone",name: "contact" ,onChange: (e:string)=>setContact(e)})}

{TextBoxInput({width: 50, height: 10, onChange: (e:string)=>setComment(e), placeholder: comment || "Additional Comments"})}

            </form>

            <Button
                text = "Edit Appointment"
                handleButtonClick={()=> handleEditAppointment()}/>

        </main>
    )
}