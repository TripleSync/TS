import logo from "@assets/whitelogo.png";
import { RxExit, RxPerson } from "react-icons/rx";
import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="h-16 w-full overflow-hidden bg-primary">
      <ul className="flex h-full w-full flex-row items-center justify-between px-4">
        <li>
          <NavLink to="/" className="inline-block">
            <RxExit className="text-3xl font-bold text-white" />
          </NavLink>
        </li>
        <li>
          <NavLink to="/" className="inline-block">
            <img src={logo} className="m-auto mt-1 w-24" />
          </NavLink>
        </li>
        <li>
          <NavLink to="/classroom" className="inline-block">
            <RxPerson className="text-3xl font-bold text-white" />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
export default Nav;
