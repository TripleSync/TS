export const inputStyle =
  "mt-2 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-secondary focus:outline-none focus:ring-secondary overflow-hidden";

const LoginInput = ({
  label,
  type,
  value,
  onChange,
  required = true,
  disabled = false,
  id,
}: {
  label: string;
  type: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  disabled?: boolean;
  id: string;
}) => (
  <div className="mt-1">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <input
      type={type}
      disabled={disabled}
      id={id}
      value={value}
      onChange={onChange}
      className={`${inputStyle} ${disabled && "cursor-not-allowed bg-gray-200 text-gray-500"}`}
      required={required}
    />
  </div>
);
export default LoginInput;
