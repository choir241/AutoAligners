import {
  GeneralInputInterface,
  ChooseTwoInputInterface,
  TextBoxInputInterface,
} from "../../middleware/interfaces/component";

export function GeneralInput(props: GeneralInputInterface) {
  return (
    <input
      key={props.key}
      type={props.type}
      name={props.name}
      disabled={props.disabled}
      value={props.value}
      onChange={(e) => props.onChange(e.target.value)}
      placeholder={props.placeholder}
      min={props.min}
      max={props.max}
    />
  );
}

export function ChooseTwoInput(props: ChooseTwoInputInterface) {
  return (
    <section className="flex justifyCenter">
      <input
        type="radio"
        value={props.text1}
        name={props.name}
        onChange={(e) => props.onChange(e.target.value)}
      />
      <label>{props.text1}</label>

      <input
        type="radio"
        value={props.text2}
        name={props.name}
        onChange={(e) => props.onChange(e.target.value)}
      />
      <label>{props.text2}</label>
    </section>
  );
}

export function TextBoxInput(props: TextBoxInputInterface): React.JSX.Element {
  return (
    <textarea
      rows={props.height}
      cols={props.width}
      spellCheck={true}
      wrap="hard"
      onChange={(e) => props.onChange(e.target.value)}
      placeholder={props.placeholder}
    />
  );
}
