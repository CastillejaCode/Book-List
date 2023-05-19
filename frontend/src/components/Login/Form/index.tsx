import { ReactElement } from "react";
import { signInAnonymously } from "firebase/auth";
import auth from "../../../auth/config";
const Form = ({ children }: { children: ReactElement }) => {
  const anonymousLogin = async () => {
    try {
      await signInAnonymously(auth);
      console.log(auth.currentUser);
    } catch (error) {
      console.log(error.code);
    }
  };
  return (
    <div className="fixed top-40 flex flex-col items-center rounded-lg border-2 border-slate-600/80 bg-gray-50 p-8  shadow-lg">
      {children}
      <button
        className="btn absolute -bottom-20 text-lg normal-case shadow-lg"
        onClick={anonymousLogin}
      >
        Demo
      </button>
    </div>
  );
};

export default Form;
