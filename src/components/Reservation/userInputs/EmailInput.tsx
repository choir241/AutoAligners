export default function EmailInput({handleUpdateEmail}:{handleUpdateEmail: (email: string) => void}){
    return(
        <div className="flex flex-col items-start justify-start">
        <label htmlFor="email" className="mb-1">Email</label>
        <input
        type = "email"
        placeholder = "Your Email"
        onChange={(e)=>handleUpdateEmail(e.target.value)}
        />
        </div>

    )
}