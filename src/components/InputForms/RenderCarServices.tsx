import { services } from "./data";
import { toast } from "react-toastify";

export function RenderCarServices(
  onChange: (e: string) => void,
  defaultValue?: string,
) {
  try {
    //returns a new array of react jsx elements with all available car services
    const serviceOptions = services.map((service: string, i: number) =>
      service !== defaultValue ? <option key={i}>{service}</option> : "",
    );

    return (
      <select onChange={(e) => onChange(e.target.value)}>
        <option defaultValue={defaultValue || "default"}>
          {defaultValue || `Choose Service For Your Car`}
        </option>
        {serviceOptions}
      </select>
    );
  } catch (err) {
    console.error(err);
    toast.error(`${err}`);
  }
}
