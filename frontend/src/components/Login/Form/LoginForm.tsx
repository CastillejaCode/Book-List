import { useDispatch } from "react-redux";
import { useField } from "./useField";
import { resetError, setError } from "../../../features/errorSlice";
import { toggleCreate } from "../../../features/toggleSlice";
import { signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../../auth/config";

const LoginForm = () => {
  const dispatch = useDispatch();
  // id, type
  const email = useField("email", "text");
  const password = useField("pwd", "text");

  const login = (event: React.SyntheticEvent) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email.value, password.value).catch(
      (error) => {
        dispatch(setError(error.code));
        setTimeout(() => dispatch(resetError()), 5000);
      }
    );
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
