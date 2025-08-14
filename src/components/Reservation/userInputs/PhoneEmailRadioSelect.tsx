interface IPhoneEmailRadioSelect {
  preferredContact: string;
  handleUpdatePreferredContact: (e: string) => void;
}

export default function PhoneEmailRadioSelect({
  props,
}: {
  props: IPhoneEmailRadioSelect;
}) {
  return (
    <div className="flex flex-col items-start mt-6 w-full">
      <h3 className="mb-2">Preferred Contact Method</h3>
      <div className="flex mb-2">
      <div className="flex w-full">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="radio"
          checked={props.preferredContact === "email"}
          className="radio"
          defaultValue="email"
          name="contact"
          onChange={(e) => props.handleUpdatePreferredContact(e.target.value)}
        />
      </div>
      <div className="flex w-full">
        <label htmlFor="phone">Phone</label>
        <input
          id="phone"
          type="radio"
          className="radio"
          defaultValue="phone"
          name="contact"
          onChange={(e) => props.handleUpdatePreferredContact(e.target.value)}
        />
      </div>
      </div>
    </div>
  );
}
