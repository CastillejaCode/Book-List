import clsx from "clsx";
import { FirebaseError } from "firebase/app";
import {
  EmailAuthProvider,
  createUserWithEmailAndPassword,
  linkWithCredential,
  updateProfile,
} from "firebase/auth";
import { useEffect, useRef } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import auth from "src/auth/config";
import SubmitButton from "src/components/ui/SubmitButton";
import Toast from "src/components/ui/Toast";
import { useField } from "src/hooks/useField";
import useToast from "src/hooks/useToast";

interface Props {
  text: "Sign up" | "Get started";
}

export default function SignUp({ text }: Props) {
  const { addToast } = useToast();
  const navigate = useNavigate();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [user] = useAuthState(auth);

  const [name, setName] = useField({
    id: "name",
    type: "text",
  });
  const [email, setEmail] = useField({
    id: "email",
    type: "email",
  });
  const [password, setPassword] = useField({
    id: "pwd",
    type: "password",
  });

  useEffect(() => {
    if (user?.isAnonymous) {
      dialogRef.current?.showModal();
    }
  }, []);

  const signUp = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      if (user?.isAnonymous) {
        const credential = EmailAuthProvider.credential(
          email.value,
          password.value
        );
        await linkWithCredential(user, credential);

        addToast({ message: "Anonymous account successfully upgraded." });
      } else {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email.value,
          password.value
        );
        await updateProfile(userCredential.user, { displayName: name.value });
      }
      navigate("/home");
      dialogRef.current?.close();
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      if (!(error instanceof FirebaseError)) return;
      addToast({ message: error.code, type: "error" });
    }
  };

  return (
    <>
      <button
        className={clsx(
          text === "Get started" && "btn-primary btn bg-indigo-600"
        )}
        onClick={() => dialogRef.current?.showModal()}
      >
        {text}
      </button>
      <dialog ref={dialogRef} className="modal">
        <div className="modal-box  bg-zinc-100 dark:bg-zinc-900">
          <form className="flex flex-col gap-6" onSubmit={signUp}>
            <h1 className="text-center text-3xl font-medium ">
              {user?.isAnonymous ? "Upgrade Demo Account" : "Sign Up"}
            </h1>
            <div className="flex flex-col">
              <label htmlFor="name" className="dark:font-medium ">
                first name
              </label>
              <input {...name} className="input-login" />
            </div>
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
            </div>
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
