import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import auth from "src/auth/config";
import { resetError, setError } from "src/slices/notificationSlice";
import { toggleCreate, toggleResetPassword } from "src/slices/toggleSlice";
import { useField } from "src/hooks/useField";
import SubmitButton from "src/components/SubmitButton";
const LoginForm = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useField({
    id: "email",
    type: "email",
  });
  const [password, setPassword] = useField({
    id: "pwd",
    type: "password",
  });

  const login = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email.value, password.value);
      setEmail("");
      setPassword("");
    } catch (error) {
      if (!(error instanceof FirebaseError)) return;
      dispatch(setError(error.code));
      setTimeout(() => dispatch(resetError()), 5000);
    }
  };

  return (
    <>
      <h2 className="mb-6 text-3xl font-medium ">Login</h2>
      <form className="flex w-full flex-col gap-6" onSubmit={login}>
        <div className="flex flex-col">
          <label htmlFor="email" className="dark:font-medium ">
            email *
          </label>
          <input {...email} className="input-login" required />
        </div>
        <div className="mb-4 flex flex-col">
          <label htmlFor="pwd" className="dark:font-medium">
            password *
          </label>
          <input {...password} className="input-login" required />
          <button
            onClick={() => dispatch(toggleResetPassword())}
            type="button"
            className="w-fit self-end px-1 py-2 text-center text-sm dark:font-medium dark:text-zinc-400"
          >
            forgot password?
          </button>
        </div>
        <div className="flex flex-col items-center gap-4">
          <SubmitButton />
          <button
            className=" btn-outline btn-sm btn w-fit text-lg normal-case dark:text-zinc-200"
            onClick={() => dispatch(toggleCreate())}
          >
            Create
          </button>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
