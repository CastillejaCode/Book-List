import { useAuthState } from "react-firebase-hooks/auth";
import auth from "./auth/config.js";
import NavBar from "./components/NavBar/NavBar";
import Books from "./components/Books/index.js";
import Modal from "./components/Modal/Modal";
import Login from "./components/Login/index.js";

import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import { RootState } from "./store.js";

const App = () => {
  const [user, loading, error] = useAuthState(auth);
  const credential = useSelector((state: RootState) => state.user.credential);
  console.log(credential);

  if (loading)
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <ArrowPathIcon className="aspect-square h-24 animate-spin" />
      </div>
    );
  if (error) return <div>something broke...</div>;

  return (
    <div>
      {user?.emailVerified || (user?.isAnonymous && !credential) ? (
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
