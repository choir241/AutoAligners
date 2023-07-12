    import React, {useState, useEffect} from "react"
    import {Button} from "../components/Button"
    import Nav from "../components/Nav"
    import {getAppointmentData, Appointment, checkAppointmentDate, DisplayTimeDateAppointments, GetCarData, SelectCarMakeInput, SelectCarModelInput, ChooseTwoInput, SelectCarYearInput, ChooseCarService, Input, TextBoxInput, checkInputValidation} from "../hooks/ReservationHooks"

    export default function Reservation(){
        
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

        useEffect(()=>{
            GetCarData({onMakeSelect: setCarMakeOptions, onModelSelect: setCarModelOptions, onYearSelect: setCarYearOptions, carMake: carMake, carModel:carModel});

            getAppointmentData((e:Appointment[])=>setAppointments(e))

        },[carMake, carModel]);
        

        function handleCreateAppointment():void{    

            checkAppointmentDate(date, time, (e:string)=>setDate(e))

            if(!checkInputValidation({service: service, firstName: firstName, lastName: lastName, date: date, time: time, carModel: carModel, carMake: carMake, carYear:carYear, email: email, phone: phone, zipCode: zipCode, contact: contact, comment: comment, stayLeave:stayLeave})){
                return;
            }

        }

        return(
            <main>

                <Nav/>

                <h1>Make Reservation</h1>

                <form>
            
                    {DisplayTimeDateAppointments((e:string)=>setTime(e),appointments, (e:string)=>setDate(e))}

                    {SelectCarMakeInput({defaultValue: "Car Make", options: carMakeOptions, onChange: (e:string)=>setCarMake(e), carMake: carMake, carYear: carYear, carModel: carModel, resetModel: (e:string)=>setCarModel(e), resetYear:(e:string)=>setCarYear(e), resetMake:(e:string)=>setCarMake(e)})}
                    {SelectCarModelInput({defaultValue: "Car Model", options: carModelOptions, onChange: (e:string)=>setCarModel(e), carMake: carMake, carModel: carModel, carYear: carYear, resetModel:(e:string)=>setCarModel(e), resetYear: (e:string)=>setCarYear(e), resetMake:(e:string)=>setCarMake})}
                    {SelectCarYearInput({defaultValue: "Car Year", options: carYearOptions, onChange: (e:string)=>setCarYear(e), carMake: carMake, carModel: carModel, carYear: carYear, resetModel:(e:string)=>setCarModel(e),resetYear:(e:string)=>setCarYear(e),resetMake:(e:string)=>setCarMake(e)})}

                    {ChooseTwoInput({text1: "Drop off car",text2: "Wait for car",name: "stayLeave",onChange: (e:string)=>setStay_Leave(e)})}

                    {ChooseCarService((e:string)=>setService(e))}

                    {Input({type: "text", onChange: (e:string)=>setFirstName(e), placeholder: "First Name"})}
                    {Input({type: "text", onChange: (e:string)=>setLastName(e), placeholder: "Last Name"})}
                    {Input({type: "text", onChange: (e:string)=>setEmail(e), placeholder: "Email Address"})}
                    {Input({type: "tel", onChange: (e:string)=>setPhone(e), placeholder: "###-###-####", minlength: 10, maxlength: 10})}
                    {Input({type: "text", onChange: (e:string)=>setZipCode(e), placeholder: "Postal/Zip Code", minlength: 5, maxlength: 5})}

                    <h2>Preferred Contact Method</h2>

                    {ChooseTwoInput({text1:"Email",text2: "Phone",name: "contact" ,onChange: (e:string)=>setContact(e)})}

                    {TextBoxInput({width: 50, height: 10, onChange: (e:string)=>setComment(e), placeholder: "Additional Comments"})}

                </form>

                
                <Button
                text = "Reserve Appointment"
                handleButtonClick={()=> handleCreateAppointment()}/>

            </main>
        )
    }