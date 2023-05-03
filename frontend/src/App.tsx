import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Books from "./components/Content/Books";
import Modal from "./components/Modal/Modal";
import { useState } from "react";

const App = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative z-10">
      <NavBar />
      <Books />
      <Modal />
    </div>
  );
};

export default App;
