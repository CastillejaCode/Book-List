import clsx from "clsx";
import { FirebaseError } from "firebase/app";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import auth from "src/auth/config";
import SubmitButton from "src/components/ui/SubmitButton";
import Toast from "src/components/ui/Toast";
import { useField } from "src/hooks/useField";
import useToast from "src/hooks/useToast";

export default function Login() {
  const { addToast } = useToast();
  const navigate = useNavigate();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [showLogin, setShowLogin] = useState(true);
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
      navigate("/home");
      setEmail("");
      setPassword("");
    } catch (error) {
      if (!(error instanceof FirebaseError)) return;
      addToast({ message: error.code, type: "error" });
    }
  };

  const resetPassword = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email.value);
      dialogRef.current?.close();
      setEmail("");
      addToast({ message: "email sent to reset password" });
    } catch (error) {
      if (!(error instanceof FirebaseError)) return;
      addToast({ message: error.code, type: "error" });
    }
  };

  const resetModal = () => {
    setTimeout(() => setShowLogin(true), 300);
    setEmail("");
    setPassword("");
  };

  return (
    <>
      <button onClick={() => dialogRef.current?.showModal()}>Login</button>
      <dialog ref={dialogRef} className="modal" onClose={resetModal}>
        <div className="modal-box  bg-zinc-100 dark:bg-zinc-900">
          <form
            className="flex flex-col gap-6"
            onSubmit={showLogin ? login : resetPassword}
          >
            <h1 className="text-center text-3xl font-medium ">
              {showLogin ? "Login" : "Reset Password"}
            </h1>
            <div className={clsx("flex flex-col", !showLogin && "mb-4")}>
              <label htmlFor="email" className="dark:font-medium ">
                email *
              </label>
              <input {...email} className="input-login" required />
            </div>
            {showLogin && (
              <div className="flex flex-col">
                <label htmlFor="pwd" className="dark:font-medium">
                  password *
                </label>
                <input {...password} className="input-login" required />
                <button
                  type="button"
                  className="w-fit self-end px-1 py-2 text-center text-sm dark:font-medium dark:text-zinc-400"
                  onClick={() => setShowLogin(false)}
                >
                  forgot password?
                </button>
              </div>
            )}
            <SubmitButton />
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
        <Toast />
      </dialog>
    </>
  );
}
