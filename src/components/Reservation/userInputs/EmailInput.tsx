export default function EmailInput({handleUpdateEmail}:{handleUpdateEmail: (email: string) => void}){
    return(
        <input
        type = "email"
        placeholder = "Your Email"
        onChange={(e)=>handleUpdateEmail(e.target.value)}
        />
    )
}