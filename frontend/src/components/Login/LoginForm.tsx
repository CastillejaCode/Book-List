import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../auth/config";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUID } from "../../features/userSlice";
import { redirect, useNavigate } from "react-router-dom";

interface Props {
  setCreate: () => boolean;
}

const LoginForm = ({ setCreate }: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = (event: React.SyntheticEvent) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch(setUID(user.uid));
        setEmail("");
        setPassword("");
        navigate("/home");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };
  return (
    <div className="absolute top-1/4 flex flex-col items-center">
      <h2 className="mb-4 text-2xl">Login</h2>
      <form className="flex flex-col gap-4" onSubmit={login}>
        <div className="flex flex-col">
          <label htmlFor="email">email</label>
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="input-bordered input input-sm"
            type="text"
            id="email"
          />
        </div>
        <div className="mb-2 flex flex-col">
          <label htmlFor="pwd">password</label>
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="input-bordered input input-sm"
            type="text"
            id="pwd"
          />
        </div>
        <div className="flex flex-col items-center gap-4">
          <button type="submit" className="btn w-fit">
            Login
          </button>
          <button
            className="btn-outline btn-sm btn w-fit"
            onClick={() => setCreate(true)}
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
