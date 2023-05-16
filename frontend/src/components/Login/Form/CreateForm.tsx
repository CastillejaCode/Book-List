import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import auth from "../../../auth/config";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toggleCreate } from "../../../features/toggleSlice";
import { setError, resetError } from "../../../features/errorSlice";

const CreateForm = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitForm = (event: React.SyntheticEvent) => {
    event.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        updateProfile(user, { displayName: name });
        setName("");
        setEmail("");
        setPassword("");
        dispatch(toggleCreate());
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        dispatch(setError(error.code));
        setTimeout(() => dispatch(resetError()), 5000);
        // ..
      });
  };

  return (
    <>
      <h2 className="mb-6 text-3xl font-semibold">Create Account</h2>
      <form className="flex flex-col gap-6" onSubmit={submitForm}>
        <div className="flex flex-col">
          <label htmlFor="username">first name</label>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="input-bordered input input-sm bg-gray-200 text-lg"
            type="text"
            id="username"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email">email</label>
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="input-bordered input input-sm bg-gray-200 text-lg"
            type="text"
            id="email"
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
          />
        </div>
        <div className="flex flex-col items-center gap-4">
          <button className="btn bg-blue-500 text-xl normal-case">
            Submit
          </button>
          <button
            className="btn-outline btn-sm btn w-fit text-lg normal-case"
            onClick={() => dispatch(toggleCreate())}
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
};

export default CreateForm;
