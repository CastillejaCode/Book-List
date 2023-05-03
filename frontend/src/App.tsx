import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Books from "./components/Content/Books";
import Modal from "./components/Modal/Modal";

const App = () => {
  return (
    <div className="relative z-10">
      <NavBar />
      <Books />
      <Modal />
    </div>
  );
};

export default App;
