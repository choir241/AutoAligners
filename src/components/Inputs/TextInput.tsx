import type { ITextInput } from "../../interfaces/Inputs";

export function TextInput(props: ITextInput): React.JSX.Element {
  return (
    <input
      className="mb-4"
      name={props.name}
      disabled={props.isDisabled}
      type={props.type}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => props.onChange(e)}
      placeholder={props.placeholder}
    />
  );
}
