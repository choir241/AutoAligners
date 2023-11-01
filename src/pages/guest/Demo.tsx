import Nav from "../../components/Nav"
import {Input, handleLogin} from "../../hooks/LoginHooks"
import {ButtonSubmit} from "../../components/Button"
import Footer from "../../components/Footer"


export default function Demo(){

    const name = "Helena Blavatsky"
    const email = "helena24@gmail.com"
    const password = "isKri8!3"

    return(
        <main id = "auth">
            <Nav pageHeading = {"Demo Account Login"}/>


            <section className="flex flex-col alignCenter justifyCenter">
                <form className = "flex flex-col alignCenter">        
                  {Input({type: "email", onChange: (e:string)=> e,  name: "email", placeholder: email, disabled : true})}
                  {Input({type: "text", onChange: (e:string)=> e, name: "name", placeholder: name, disabled : true})}
                  {Input({type: "password",onChange: (e:string)=> e,  name: "password", placeholder: password, disabled : true})}



                {ButtonSubmit({handleButtonClick: ()=>handleLogin({email:email, name: name, password: password}), text: "Login"})}
                </form>
            </section>
          
            <Footer/>

        </main>
    )

}