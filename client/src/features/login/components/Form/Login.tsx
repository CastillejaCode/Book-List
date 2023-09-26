import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import auth from "src/auth/config";
import SubmitButton from "src/components/SubmitButton";
import { useField } from "src/hooks/useField";
import { resetError, setError } from "src/slices/notificationSlice";
import { toggleResetPassword } from "src/slices/toggleSlice";
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

  const handleLogin = () => {
    const modal = document.getElementById("login-modal") as HTMLDialogElement;
    modal.showModal();
  };

  return (
    <>
      <button onClick={handleLogin}>Login</button>
      <dialog className="modal" id="login-modal">
        <div className="modal-box flex flex-col gap-4 bg-zinc-100">
          <h1 className="text-center text-3xl font-medium ">Login</h1>
          <form
            className="flex w-full flex-col gap-6"
            method="dialog"
            onSubmit={login}
          >
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
            </div>
          </form>
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn-ghost btn-sm btn-circle btn absolute right-2 top-2">
              ✕
            </button>
          </form>
        </div>
        {/* This form is to allow for clicking outside to close */}
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};

export default LoginForm;
