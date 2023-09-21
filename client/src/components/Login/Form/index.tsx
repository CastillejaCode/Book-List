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
    <section className="flex flex-col items-center gap-8">
      <div className="flex flex-col items-center rounded-lg border-2 border-zinc-600 bg-zinc-100 p-8 shadow-lg">
        {children}
      </div>
      <Toast />
      <button
        className="btn  w-fit text-lg normal-case shadow-lg"
        onClick={anonymousLogin}
      >
        Demo
      </button>
    </section>
  );
};

export default Form;
