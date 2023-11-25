import { ReactElement } from "react";
import { signInAnonymously } from "firebase/auth";
import auth from "src/auth/config";
import Toast from "src/components/ui/Toast";

const Form = ({ children }: { children: ReactElement }) => {
  const anonymousLogin = async () => {
    try {
      await signInAnonymously(auth);
    } catch (error) {
      return <div>That didn't work... refresh the page</div>;
    }
  };
  return (
    <section className="flex w-full max-w-md flex-col items-center gap-8">
      <div className="flex w-full flex-col items-center rounded-lg border-2 border-zinc-600 bg-zinc-100 p-8 shadow-lg dark:border-none dark:bg-zinc-800">
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
