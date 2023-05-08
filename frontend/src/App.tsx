import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Books from "./components/Content/Books";
import Modal from "./components/Modal/Modal";
import Login from "./components/Login/Index";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/home"
          element={
            <div className="relative z-10">
              <NavBar />
              <Books />
              <Modal />
            </div>
          }
        />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
