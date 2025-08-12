export default function PhoneInput({
  handleUpdatePhone,
}: {
  handleUpdatePhone: (phone: string) => void;
}) {
  return (
    <div className="flex flex-col items-start justify-start">
      <label htmlFor="Phone" className="mb-1">
        Phone
      </label>
      <input
        type="tel"
        onChange={(e) => handleUpdatePhone(e.target.value)}
        placeholder="###-###-####"
        minLength={10}
        maxLength={10}
      />
    </div>
  );
}
