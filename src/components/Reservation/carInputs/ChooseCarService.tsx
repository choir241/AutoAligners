import { services } from "../../../api/carServices";

export function ChooseCarService({
  onChange,
  defaultValue,
  className,
}: {
  onChange: (e: string) => void;
  defaultValue?: string;
  className?: string;
}) {
  return (
    <select className={className} onChange={(e) => onChange(e.target.value)}>
      <option defaultValue={defaultValue || "default"}>
        {defaultValue || `Choose Service For Your Car`}
      </option>
      {services.map((service: string, i: number) =>
        service !== defaultValue ? <option key={i}>{service}</option> : ""
      )}
    </select>
  );
}
