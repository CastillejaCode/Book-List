import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Books from "./components/Content/Cards/index.js";
import Modal from "./components/Modal/Modal";
import Login from "./components/Login/Index";

import { useDispatch } from "react-redux";

import auth from "./auth/config.js";
import { useAuthState } from "react-firebase-hooks/auth";
import { setUID, setName } from "./features/userSlice.js";

import { ArrowPathIcon } from "@heroicons/react/24/outline";

const App = () => {
  const dispatch = useDispatch();
  const [user, loading, error] = useAuthState(auth);

  if (loading)
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <ArrowPathIcon className="aspect-square h-24 animate-spin" />
      </div>
    );
  if (error) return <div>something broke...</div>;
  if (user) {
    dispatch(setUID(user.uid));
    dispatch(setName(user.displayName));
  }
  return (
    <div>
      {user ? (
        <div className="relative z-10">
          <NavBar />
          <Books />
          <Modal />
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default App;
