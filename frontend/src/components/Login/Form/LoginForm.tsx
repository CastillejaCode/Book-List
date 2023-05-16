import { signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../../auth/config";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { resetError, setError } from "../../../features/errorSlice";
import { toggleCreate } from "../../../features/toggleSlice";

const LoginForm = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = (event: React.SyntheticEvent) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        dispatch(setError(error.code));
        setTimeout(() => dispatch(resetError()), 5000);
      });
  };
  return (
    <>
      <h2 className="mb-6 text-3xl font-semibold">Login</h2>
      <form className="flex flex-col gap-6" onSubmit={login}>
        <div className="flex flex-col">
          <label htmlFor="email">email</label>
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="input-bordered input input-sm bg-gray-200 text-lg"
            type="text"
            id="email"
            required
          />
        </div>
        <div className="mb-4 flex flex-col">
          <label htmlFor="pwd">password</label>
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="input-bordered input input-sm bg-gray-200 text-lg"
            type="text"
            id="pwd"
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
