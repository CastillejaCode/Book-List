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
  const { setValue: setEmailValue, ...email } = useField("email", "text");
  const { setValue: setPasswordValue, ...password } = useField("pwd", "text");
  const [signInWithEmailAndPassword, error] =
    useSignInWithEmailAndPassword(auth);
  // const [showVerify, setShowVerify] = useState(false);

  if (error) return <div>Connection to Firease broke, try again</div>;
  const login = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    await signInWithEmailAndPassword(email.value, password.value);
    setEmailValue("");
    setPasswordValue("");
  };

  // const verify = (event: React.SyntheticEvent) => {
  //   event.preventDefault();
  //   sendEmailVerification(user).then(() => {
  //     dispatch(setNotif("Email sent!"));
  //     setShowVerify(false);
  //     setTimeout(() => dispatch(resetNotif()), 6000);
  //   });
  // };
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
          {/* {showVerify && (
            <button
              className="btn mt-4 bg-blue-500 text-xl normal-case"
              onClick={verify}
            >
              Verify
            </button>
          )} */}
        </div>
      </form>
    </>
  );
};

export default LoginForm;
