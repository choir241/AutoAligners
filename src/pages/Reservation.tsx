    import React, {useState, useEffect} from "react"
    import {Button} from "../components/Button"
    import {toast} from "react-toastify"
    import api from "../api/api"
    import { Permission, Role } from "appwrite"
    import Nav from "../components/Nav"
    import {GetCarData, SelectCarMakeInput, SelectCarModelInput, ChooseTwoInput, SelectCarYearInput, ChooseCarService, Input, TextBoxInput} from "../hooks/ReservationHooks"

    function handleChangeTime(e:React.MouseEvent<HTMLButtonElement, MouseEvent>, time:string, setTime: (e:string)=>void){
        e.preventDefault();
        setTime(time)
    }

    export function DisplayTimeAppointments(setTime: (e:string)=>void):React.JSX.Element{
            // 7am - 3pm sat 
            // 7am - 5pm mon-fri

            let jsx = []

            let minutes = 0;

            for(let time = 7; time <= 17; time++){
                let hourString:string = time.toString()
                let minuteString:string = minutes.toString()
                jsx.push(hourString += ":" + minuteString + "0");
            }

            for(let time = 7; time <= 17; time++){
                const min = 30
                    let hourString:string = time.toString()
                    let minuteString:string = min.toString()
                    jsx.push(hourString += ":" + minuteString);
            }   

            const sortedJSX = jsx.sort((a,b)=>parseInt(a)-parseInt(b));

            const finalJSX = sortedJSX.map((jsx,i)=>{return(
                <div key = {i}>
                       <button 
                             className = "clearButton"
                             onClick = {(e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
                                 e.preventDefault();
                                 handleChangeTime(e, jsx, (e:string)=>setTime(e))}}
                             >
                                 {jsx}
                        </button>
                </div>
            )
        })


            return(
                <section className = "appointmentTimes flex">
                    {finalJSX}
                </section>
            )
  
    }

    export function Calendar(){
        const date = new Date();
        let month:number = date.getMonth()+1;
        let dayOfWeek:number = date.getDay();
        let year:number = date.getFullYear();
        let day:number = date.getDate();

        const daysOfWeek = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

        const appt:React.JSX.Element[] = [];

        for(let i = 0; i < 21; i++){

            switch(month){
                case 1:
                case 3:
                case 5:
                case 7:
                case 8:
                case 10:
                    if(day > 31){
                        day = 1;
                        month += 1;
                    }
                    break;
                case 4:
                case 6:
                case 9:
                case 11:
                    if(day > 30){
                        day = 1;
                        month += 1;
                    }
                    break;
                case 2:
                    if(day > 28){
                        day = 1;
                        month += 1;
                    }
                    break;
                case 12:
                    if(day > 31){
                        day = 1;
                        month = 1;
                        year += 1;
                    }
                    break;
            }

            if(dayOfWeek > 6){
                dayOfWeek = 0;
            }

          
            appt.push(
                <div className = "calendar clearButton" key = {`c-${i}`}>
                    <h3>{daysOfWeek[dayOfWeek]}</h3>
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

        useEffect(()=>{
            GetCarData({onMakeSelect: setCarMakeOptions, onModelSelect: setCarModelOptions, onYearSelect: setCarYearOptions, carMake: carMake, carModel:carModel});
        },[carMake, carModel]);
        

        function checkAppointmentDate(date: string):string | void{

            if(!date){
                toast.error("Pick a valid date");
                return;
            }

            const arrayOfDateAppt = date.split("T")[0].split("-");
            const arrayOfTimeAppt = time.split(":");

            //military time

            const currentDate = new Date();

            //Checks if month/date/year of appointment is current/future date
            if(parseInt(arrayOfDateAppt[2]) < currentDate.getDate() || parseInt(arrayOfDateAppt[1]) < currentDate.getMonth()+1 || parseInt(arrayOfDateAppt[0]) < currentDate.getFullYear()){
                toast.error("Choose a current date or a date in the future.");
                return;
            }   

            const checkForSameDay = (parseInt(arrayOfDateAppt[2]) === currentDate.getDate() && parseInt(arrayOfDateAppt[1]) === currentDate.getMonth()+1 && parseInt(arrayOfDateAppt[0]) === currentDate.getFullYear())

            if(checkForSameDay){
                toast.error("Choose a current time or a time in the future.");
                return;
            }

            const appointmentDayoFWeek = new Date(date);
            const daysOfWeek = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
            const getAppointmentDayoFWeek = appointmentDayoFWeek.getDay();

            if(getAppointmentDayoFWeek === 6){
                toast.error("We are closed on Sundays");
                return;
            }else if(getAppointmentDayoFWeek === 5){
                toast.error("We are not open during those times");
                return;
            }

            setDate(`${date}D${daysOfWeek[getAppointmentDayoFWeek]}`)
                }

        function checkInputValidation():false|undefined{
            if(!date){
                toast.error("Please select a proper date");
                return false;
            }else if(!time){            
                toast.error("Please select an available time");
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
            
            // if(!checkInputValidation()){
            //     return;
            // }

            // handleSubmitData();
        }

        // async function getData(){
        //     try{
        //         const data = await api.listDocuments(process.env.REACT_APP_DATABASE_ID, process.env.REACT_APP_COLLECTION_ID)

        //         const checkExistingAppt:[] = data.documents.find((appt:Appointment)=>date === appt.date)

        //         if(checkExistingAppt){
        //             console.log("appointment already exists")
        //         }
        //         console.log(checkExistingAppt);
    
        //     }catch(err){    
        //         console.error(err);
        //     }
        // }


        return(
            <main>
                <Nav/>

                <h1>Make Reservation</h1>

                <form>
                    {/* {DateInput({type: "date", onChange: (e:React.ChangeEvent<HTMLInputElement>)=>{
                        const value:string = e.target.value
                        checkAppointmentDate(value)}})} */}

                    {Calendar()}
    
                    {DisplayTimeAppointments((e:string)=>setTime(e))}

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