export function toggleDisplay(setDisplay: (e:boolean)=>void, display: boolean){
    setDisplay(!display)
}

export function renderFinanceDisplay(text:string){
    return(
        <div>
            <h1>{text}</h1>
        </div>
    )
}