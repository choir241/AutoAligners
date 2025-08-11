export default function EmailInput({handleUpdateEmail}:{handleUpdateEmail: (email: string) => void}){
    return(
        <input
        type = "email"
        className="mb-2"
        placeholder = "Your Email"
        onChange={(e)=>handleUpdateEmail(e.target.value)}
        />
    )
}