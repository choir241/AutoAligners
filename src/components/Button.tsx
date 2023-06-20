import React from "react"
import {Link} from "react-router-dom"

interface ButtonProps{
    text: string,
    handleButtonClick: ()=>void,
}

interface ButtonLinkProps{
    domain: string,
    text: string
}

export function Button (props: ButtonProps) {
    return(
        <button 
        className = {`button`}
        onClick = {()=>props.handleButtonClick()}
        >
            {props.text}
        </button>
    )
}

export function ButtonLink (props: ButtonLinkProps){
    return(
       <Link 
       className = {`button`}
       to = {`/${props.domain}`}>
            {props.text}
       </Link>
    )
}