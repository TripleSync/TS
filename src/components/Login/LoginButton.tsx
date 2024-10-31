const LoginButton = ({
  text,
  onClick,
  type = "button",
}: {
  text: string;
  onClick?: () => void;
  type?: "button" | "submit";
}) => (
  <button
    type={type}
    className="w-[43%] rounded-md bg-primary px-4 py-2 font-semibold text-white hover:bg-dark focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2"
    onClick={onClick}>
    {text}
  </button>
);
export default LoginButton;
