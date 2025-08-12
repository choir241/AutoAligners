import NameTextInput from "./NameTextInput";
import PhoneEmailRadioSelect from "./PhoneEmailRadioSelect";
import PhoneInput from "./PhoneInput";
import EmailInput from "./EmailInput";
import { labels } from "../../../api/labels";
import { DarkModeContext } from "../../../middleware/Context";
import { useContext } from "react";

interface IUserForm {
  handleUpdateFirstName: (e: string) => void;
  handleUpdateLastName: (e: string) => void;
  handleUpdatePreferredContact: (e: string) => void;
  handleUpdatePhone: (e: string) => void;
  handleUpdateEmail: (e: string) => void;
  preferredContact: string;
}

export default function UserForm({ props }: { props: IUserForm }) {
  const { toggleDarkMode } = useContext(DarkModeContext);

  return (
    <form
      className={`flex flex-col items-start justify-center mx-2 bg-black p-4 shadow-2xs ${toggleDarkMode === labels.mode.light ? labels.mode.dark : labels.mode.light}`}
    >
      <section className="flex justify-between w-full">
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
      <div className="flex w-full items-end justify-end">
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

      </div>

    </form>
  );
}
