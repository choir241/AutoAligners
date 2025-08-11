export default function PhoneInput({handleUpdatePhone}:{handleUpdatePhone: (phone: string) => void}){
    return(
        <input
        type = "tel"
        className="mb-2"
        onChange={(e)=>handleUpdatePhone(e.target.value)}
        placeholder= "###-###-####"
        minLength = {10}
        maxLength = {10}
        />
    )
}