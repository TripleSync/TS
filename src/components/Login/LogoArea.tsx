import logo from "@assets/whitelogo.png";

const LogoArea = () => {
  return (
    <>
      <div className="flex w-1/2 items-center justify-center">
        <div className="w-1/2 rounded-full bg-secondary">
          <img src={logo} alt="logo" />
        </div>
      </div>
    </>
  );
};
export default LogoArea;
