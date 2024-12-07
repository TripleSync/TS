import logo from "@assets/whitelogo.png";
import { useState } from "react";
import { RxPerson } from "react-icons/rx";
import Modal from "./Modal";

const Nav = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <nav className="h-16 min-h-16 w-full overflow-hidden bg-primary">
      <ul className="flex h-full w-full flex-row items-center justify-between px-4">
        <li></li>
        <li>
          <img src={logo} className="m-auto mt-1 w-24" />
        </li>
        <li>
          <button onClick={() => setIsModalOpen((isModalOpen) => !isModalOpen)} className="inline-block">
            <RxPerson className="text-3xl font-bold text-white" />
          </button>
        </li>
      </ul>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </nav>
  );
};
export default Nav;
