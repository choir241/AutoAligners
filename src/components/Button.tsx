import React from "react"
import {Link} from "react-router-dom"

interface ButtonProps{
    text: string,
    handleButtonClick: ()=>void,
    classNames?: string
}

interface ButtonSubmitProps{
    text: string,
    handleButtonClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>void
}

interface ButtonLinkProps{
    domain: string,
    text: string,
    classNames?: string
}

export function ButtonSubmit (props: ButtonSubmitProps) {
    return(
        <button 
        className = "button"
        onClick = {(e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
            e.preventDefault();
            props.handleButtonClick(e)
        }}>
            {props.text}
        </button>
    )
}

export function Button (props: ButtonProps) {
    return(
        <button 
        className = {`button ${props.classNames}`}
        onClick = {(e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
            e.preventDefault();
            props.handleButtonClick()}
        }>
            {props.text}
        </button>
    )
}

export function ButtonLink (props: ButtonLinkProps):React.JSX.Element{
    return(
       <Link 
       className = {`button ${props.classNames}`}
       to = {`${props.domain}`}>
            {props.text}
       </Link>
    )
}