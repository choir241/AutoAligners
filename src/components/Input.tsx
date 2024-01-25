import {InputInterface} from "../middleware/variables/Interfaces"

export function Input(props: InputInterface){
    return (
        <input
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