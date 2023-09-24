import { useAuthState } from "react-firebase-hooks/auth";
import auth from "./auth/config.js";
import NavBar from "./components/NavBar.js";
import Books from "./features/Books/components/index.js";
import Modal from "./components/Modal.js";
import Login from "./features/Login/components/index.js";

import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import { RootState } from "./store.js";

const App = () => {
  const [user, loading, error] = useAuthState(auth);
  const credential = useSelector((state: RootState) => state.user.credential);

  if (loading)
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <ArrowPathIcon className="aspect-square h-24 animate-spin" />
      </div>
    );
  if (error) return <div>Connection to FireBase was broken...</div>;

  const temporaryUser = user?.isAnonymous && !credential;

  return (
    <div>
      {user || temporaryUser ? (
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
