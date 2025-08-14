export default function PhoneInput({
  handleUpdatePhone,
}: {
  handleUpdatePhone: (phone: string) => void;
}) {
  return (
      <input
        type="tel"
        onChange={(e) => handleUpdatePhone(e.target.value)}
        placeholder="###-###-####"
        minLength={10}
        maxLength={10}
      />
  );
}
