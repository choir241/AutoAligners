import NameTextInput from "./NameTextInput";
import PhoneEmailRadioSelect from "./PhoneEmailRadioSelect";
import PhoneInput from "./PhoneInput";
import EmailInput from "./EmailInput";

interface IUserForm {
  handleUpdateFirstName: (e: string) => void;
  handleUpdateLastName: (e: string) => void;
  handleUpdatePreferredContact: (e: string) => void;
  handleUpdatePhone: (e: string) => void;
  handleUpdateEmail: (e: string) => void;
  preferredContact: string;
}

export default function UserForm({ props }: { props: IUserForm }) {
  return (
    <form className="w-full">
      <section className="flex items-start justify-between w-full">
        <NameTextInput
          props={{
            label: "First Name",
            nameAttr: "first name",
            defaultValue: "First Name",
            handleUpdateName: props.handleUpdateFirstName,
          }}
        />

        <NameTextInput
          props={{
            label: "Last Name",
            nameAttr: "last name",
            defaultValue: "Last Name",
            handleUpdateName: props.handleUpdateLastName,
          }}
        />
      </section>
      <PhoneEmailRadioSelect
        props={{
          preferredContact: props.preferredContact,
          handleUpdatePreferredContact: props.handleUpdatePreferredContact,
        }}
      />
      {
        props.preferredContact === "phone" 
        ?
      <PhoneInput
      handleUpdatePhone={props.handleUpdatePhone}
      />
      :
      <EmailInput
      handleUpdateEmail={props.handleUpdateEmail}
      />
      }


    </form>
  );
}
