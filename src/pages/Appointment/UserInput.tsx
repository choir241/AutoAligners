import {
  GeneralInput,
  ChooseTwoInput,
  TextBoxInput,
} from "../../components/InputForms/Inputs";

interface UserInputInterface {
  setFirstName: (e: string) => void;
  setLastName: (e: string) => void;
  setEmail: (e: string) => void;
  setPhone: (e: string) => void;
  setZipCode: (e: string) => void;
  setComment: (e: string) => void;
  setContact: (e: string) => void;
}

export default function UserInput(props: UserInputInterface) {
  return (
    <section className="section-1 flex flex-col alignCenter">
      <section className="flex justifyBetween contact">
        {GeneralInput({
          type: "text",
          onChange: (e: string) => props.setFirstName(e),
          placeholder: "First Name",
        })}
        {GeneralInput({
          type: "text",
          onChange: (e: string) => props.setLastName(e),
          placeholder: "Last Name",
        })}
      </section>

      <section className="flex justifyBetween contact">
        {GeneralInput({
          type: "text",
          onChange: (e: string) => props.setEmail(e),
          placeholder: "Email Address",
        })}
        {GeneralInput({
          type: "tel",
          onChange: (e: string) => props.setPhone(e),
          placeholder: "###-###-####",
          minLength: 10,
          maxLength: 10,
        })}
      </section>

      {GeneralInput({
        type: "text",
        onChange: (e: string) => props.setZipCode(e),
        placeholder: "Postal/Zip Code",
        minLength: 5,
        maxLength: 5,
      })}

      <section className="flex flex-col alignCenter contact">
        <h2>Preferred Contact Method</h2>

        {ChooseTwoInput({
          text1: "Email",
          text2: "Phone",
          name: "contact",
          onChange: (e: string) => props.setContact(e),
        })}
        {TextBoxInput({
          width: 50,
          height: 10,
          onChange: (e: string) => props.setComment(e),
          placeholder: "Additional Comments",
        })}
      </section>
    </section>
  );
}
