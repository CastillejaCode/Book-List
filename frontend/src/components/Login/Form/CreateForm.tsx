import {
  createUserWithEmailAndPassword,
  updateProfile,
  EmailAuthProvider,
  linkWithCredential,
  sendEmailVerification,
  getAuth,
} from "firebase/auth";
import auth from "../../../auth/config";
import { useDispatch } from "react-redux";
import { useField } from "../../../hooks/useField";
import { toggleCreate } from "../../../features/toggleSlice";
import {
  setError,
  resetError,
  setNotif,
  resetNotif,
} from "../../../features/notificationSlice";

const CreateForm = () => {
  const dispatch = useDispatch();
  const { setValue: setNameValue, ...name } = useField("name", "text");
  const { setValue: setEmailValue, ...email } = useField("email", "text");
  const { setValue: setPasswordValue, ...password } = useField("pwd", "text");

  const submitForm = (event: React.SyntheticEvent) => {
    event.preventDefault();
    createUserWithEmailAndPassword(auth, email.value, password.value)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        updateProfile(user, { displayName: name.value });
        sendEmailVerification(user).then(() => {
          dispatch(setNotif("Email sent!"));
          setTimeout(() => dispatch(resetNotif()), 6000);
        });
        setNameValue("");
        setEmailValue("");
        setPasswordValue("");
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

  const upgradeAccount = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      const user = auth.currentUser;
      const credential = EmailAuthProvider.credential(
        email.value,
        password.value
      );
      await linkWithCredential(user, credential);
      await updateProfile(user, { displayName: name.value });
      await sendEmailVerification(user);
      setNameValue("");
      setEmailValue("");
      setPasswordValue("");
      dispatch(toggleCreate());
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      dispatch(setError(error.code));
      setTimeout(() => dispatch(resetError()), 5000);
      // ..
    }
  };
  return (
    <>
      <h2 className="mb-6 text-3xl font-semibold">Create Account</h2>
      <form className="flex flex-col gap-6" onSubmit={submitForm}>
        <div className="flex flex-col">
          <label htmlFor="name">first name</label>
          <input
            {...name}
            className="input-bordered input input-sm bg-gray-200 text-lg"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email">email</label>
          <input
            {...email}
            className="input-bordered input input-sm bg-gray-200 text-lg"
          />
        </div>
        <div className="mb-4 flex flex-col">
          <label htmlFor="pwd">password</label>
          <input
            {...password}
            className="input-bordered input input-sm bg-gray-200 text-lg"
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
