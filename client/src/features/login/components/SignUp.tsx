import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import auth from "src/auth/config";
import SubmitButton from "src/components/SubmitButton";
import Toast from "src/components/Toast";
import { useField } from "src/hooks/useField";
import { setToast } from "src/slices/notificationSlice";

export default function SignUp() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const dispatch = useDispatch();
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

  const signUp = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.value,
        password.value
      );
      await updateProfile(userCredential.user, { displayName: name.value });
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      if (!(error instanceof FirebaseError)) return;
      dispatch(setToast({ message: error.code, type: "error" }));
    }
  };

  return (
    <>
      <button onClick={() => dialogRef.current?.showModal()}>Sign Up</button>
      <dialog ref={dialogRef} className="modal" id="login-modal">
        <div className="modal-box  bg-zinc-100 dark:bg-zinc-900">
          <form className="flex flex-col gap-6" onSubmit={signUp}>
            <h1 className="text-center text-3xl font-medium ">Sign up</h1>
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
