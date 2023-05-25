import { useDispatch } from "react-redux";
// import { useState } from "react";
// import { useAuthState } from "react-firebase-hooks/auth";
import { useField } from "../../../hooks/useField";
// import {
//   resetError,
//   resetNotif,
//   setError,
//   setNotif,
// } from "../../../features/notificationSlice";
import { toggleCreate } from "../../../features/toggleSlice";
import auth from "../../../auth/config";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";

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
  const [signInWithEmailAndPassword, error] =
    useSignInWithEmailAndPassword(auth);

  if (error) return <div>Connection to Firease broke, try again</div>;
  const login = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    await signInWithEmailAndPassword(email.value, password.value);
    setEmail("");
    setPassword("");
  };

  return (
    <>
      <h2 className="mb-6 text-3xl font-semibold">Login</h2>
      <form className="flex flex-col gap-6" onSubmit={login}>
        <div className="flex flex-col">
          <label htmlFor="email">email</label>
          <input
            {...email}
            className="input-bordered input input-sm bg-gray-200 text-lg"
            required
          />
        </div>
        <div className="mb-4 flex flex-col">
          <label htmlFor="pwd">password</label>
          <input
            {...password}
            className="input-bordered input input-sm bg-gray-200 text-lg"
            required
          />
        </div>
        <div className="flex flex-col items-center gap-4">
          <button type="submit" className="btn bg-blue-500 text-xl normal-case">
            Submit
          </button>
          <button
            className=" btn-outline btn-sm btn w-fit text-lg normal-case"
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
