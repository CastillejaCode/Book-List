import { useDispatch } from "react-redux";
import { useField } from "../../../hooks/useField";
import {
  resetError,
  resetNotif,
  setError,
  setNotif,
} from "../../../features/notificationSlice";
import { toggleCreate } from "../../../features/toggleSlice";
import {
  getAuth,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";
import auth from "../../../auth/config";
import { useState } from "react";

const LoginForm = () => {
  const dispatch = useDispatch();
  // id, type
  const { setValue: setEmailValue, ...email } = useField("email", "text");
  const { setValue: setPasswordValue, ...password } = useField("pwd", "text");
  const [showVerify, setShowVerify] = useState(false);

  const login = (event: React.SyntheticEvent) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email.value, password.value)
      .then(() => {
        const auth = getAuth();
        setEmailValue("");
        setPasswordValue("");
        if (!auth.currentUser?.emailVerified && auth.currentUser) {
          setShowVerify(true);
          throw "auth/email-not-verified";
        }
      })
      .catch((error) => {
        dispatch(setError(error.code || error));
        setTimeout(() => dispatch(resetError()), 6000);
      });
  };

  const verify = (event: React.SyntheticEvent) => {
    event.preventDefault();
    sendEmailVerification(auth.currentUser).then(() => {
      dispatch(setNotif("Email sent!"));
      setShowVerify(false);
      setTimeout(() => dispatch(resetNotif()), 6000);
    });
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
          {showVerify && (
            <button
              className="btn mt-4 bg-blue-500 text-xl normal-case"
              onClick={verify}
            >
              Verify
            </button>
          )}
        </div>
      </form>
    </>
  );
};

export default LoginForm;
