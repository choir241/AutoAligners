import NameTextInput from "./NameTextInput";
import PhoneEmailRadioSelect from "./PhoneEmailRadioSelect";

interface IUserForm {
  handleUpdateFirstName: (e: string) => void;
  handleUpdateLastName: (e: string) => void;
  handleUpdatePreferredContact: (e: string) => void;
}

export default function UserForm({ props }: { props: IUserForm }) {
  return (
    <form>
      <section className="flex flex-col items-start">
        <NameTextInput
          props={{
            label: "First Name",
            nameAttr: "first name",
            defaultValue: "First Name here",
            handleUpdateName: props.handleUpdateFirstName,
          }}
        />

        <NameTextInput
          props={{
            label: "Last Name",
            nameAttr: "last name",
            defaultValue: "Last Name here",
            handleUpdateName: props.handleUpdateLastName,
          }}
        />
      </section>
      <PhoneEmailRadioSelect
        props={{
          handleUpdatePreferredContact: props.handleUpdatePreferredContact,
        }}
      />
    </form>
  );
}
