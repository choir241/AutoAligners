import React from "react"
import {Search} from "../hooks/ManageAppointmentHooks"
import {Button} from "../components/Button"

interface SearchSystem{
    search: Search,
    searchFilters: ()=>React.JSX.Element,
    AutoSuggest: (searchValue: string)=>React.JSX.Element | undefined,
    searchResults: ()=>Promise<void>
}

export default function SearchUI(props: SearchSystem){
    return(
        <form className = "flex justifyCenter">
            <section className = "flex flex-col alignCenter search">

            {props.search.hidden ? props.searchFilters() : ""}
                <div className="flex alignCenter justifyEvenly">
                    <input type = "search" value = {props.search.searchValue} onChange = {(e)=>props.search.setSearchValue(e.target.value)}/>          
                    {props.AutoSuggest(props.search.searchValue)}
                    {Button({text: "Search", handleButtonClick: (e)=>{
                    e.preventDefault();
                    props.searchResults()}})}
                        <i className = {`${props.search.hidden ? "fa-solid fa-caret-up clearButton" : "fa-solid fa-caret-down clearButton"}`} onClick = {()=>props.search.setHidden(!props.search.hidden)}></i>
                </div>

            </section>

    
        </form>
       
    )
}