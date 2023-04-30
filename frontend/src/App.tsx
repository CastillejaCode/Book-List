import "./App.css";
import NavBar from "./components/NavBar/index";
import Books from "./components/Content/Books";
import Modal from "./components/Modal/Modal";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Books />
      <PlusCircleIcon
        className="fixed bottom-0 right-0 h-14 w-14"
        onClick={() => setIsOpen(!isOpen)}
      />
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default App;
