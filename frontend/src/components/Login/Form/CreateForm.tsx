import { updateProfile, createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../../auth/config";
import { useDispatch } from "react-redux";
import { useField } from "../../../hooks/useField";
import { toggleCreate } from "../../../features/toggleSlice";
import { setError, resetError } from "../../../features/notificationSlice";
import { FirebaseError } from "firebase/app";

const CreateForm = () => {
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

  const submitForm = async (event: React.SyntheticEvent) => {
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
      dispatch(setError(error.code));
      setTimeout(() => dispatch(resetError()), 5000);
    }
  };

  // const upgradeAccount = async (event: React.SyntheticEvent) => {
  //   event.preventDefault();
  //   try {
  //     const user = auth.currentUser;
  //     const credential = EmailAuthProvider.credential(
  //       email.value,
  //       password.value
  //     );
  //     await linkWithCredential(user, credential);
  //     await updateProfile(user, { displayName: name.value });
  //     await sendEmailVerification(user);
  //     dispatch(setNotif("Email sent!"));
  //     setTimeout(() => dispatch(resetNotif()), 6000);
  //     setNameValue("");
  //     setEmailValue("");
  //     setPasswordValue("");
  //     dispatch(toggleCreate());
  //   } catch (error) {
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //     console.log(errorCode, errorMessage);
  //     dispatch(setError(error.code));
  //     setTimeout(() => dispatch(resetError()), 5000);
  //     // ..
  //   }
  // };
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
            required
            className="input-bordered input input-sm bg-gray-200 text-lg"
          />
        </div>
        <div className="mb-4 flex flex-col">
          <label htmlFor="pwd">password</label>
          <input
            {...password}
            required
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
