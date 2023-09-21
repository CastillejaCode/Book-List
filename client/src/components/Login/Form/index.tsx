import { ReactElement } from "react";
import { signInAnonymously } from "firebase/auth";
import auth from "../../../auth/config";
import Toast from "../../UserSettings/Toast";

const Form = ({ children }: { children: ReactElement }) => {
  const anonymousLogin = async () => {
    try {
      await signInAnonymously(auth);
    } catch (error) {
      return <div>That didn't work... refresh the page</div>;
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
      <Toast />
    </div>
  );
};

export default Form;
