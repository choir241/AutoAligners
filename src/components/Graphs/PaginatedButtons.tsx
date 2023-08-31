import React from "react"

interface buttons{
    cartLength: number,
    setCurrentPage: (e:number) => void,
    currentPage: number,
    rowsPerPage: number
}


export default function PaginatedButtons(props: buttons){

const handlePageChange = (newPage:number) => {
        props.setCurrentPage(newPage);
      }

return(
  <div>
        {Array.from({ length: Math.ceil(props.cartLength / props.rowsPerPage) }, (_, i) => (
        <button className = {`clearButton ${props.currentPage === i+1 ? "selectedPage" : ""}`}  onClick = {()=>handlePageChange(i+1)}>{i+1}</button> 
      ))}
  </div>
)
}
