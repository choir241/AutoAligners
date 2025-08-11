interface INameTextInput {
  label: string;
  nameAttr: string;
  handleUpdateName: (e: string) => void;
  defaultValue: string;
}

export default function NameTextInput({ props }: { props: INameTextInput }) {
  return (
    <div className="flex flex-col items-start justify-start w-full">
      <label className="my-1">{props.label}</label>
      <input
        name={props.nameAttr}
        className="mb-2 w-80"
        type="text"
        onChange={(e) => props.handleUpdateName(e.target.value)}
        defaultValue={`${props.defaultValue + " Here"}`}
      />
    </div>
  );
}
