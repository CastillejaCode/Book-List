import auth from "../../auth/config";
import { updatePassword, signOut } from "firebase/auth";
import { useField } from "../../hooks/useField";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch } from "react-redux";
import { setToast } from "../../features/notificationSlice";
import Toast from "./Toast";

const Password = () => {
  const dispatch = useDispatch();
  const [password, setPassword] = useField({
    id: "pwd",
    type: "password",
  });
  const [passwordConfirm, setPasswordConfirm] = useField({
    id: "pwdConfirm",
    type: "password",
  });
  const [user] = useAuthState(auth);

  const resetPassword = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (!user) return;
    console.log(password.value, passwordConfirm.value);
    try {
      if (passwordConfirm.value !== password.value)
        throw Error("Passwords do not match");

      await updatePassword(user, password.value);
      setPassword("");
      setPasswordConfirm("");
      signOut(auth);
    } catch (error) {
      if (error instanceof Error) dispatch(setToast(error.message));
      setPassword("");
      setPasswordConfirm("");
    }
  };

  return (
    <div className="flex w-fit flex-col items-center gap-4">
      <div className="w-full">
        <h2>Reset your password here.</h2>
        <h2>You will be then be signed out.</h2>
      </div>
      <Toast />
      <form className="flex w-full flex-col gap-6 p-0" onSubmit={resetPassword}>
        <div className="flex flex-col">
          <label htmlFor="name">password</label>
          <input
            {...password}
            className="input-sm rounded-sm border border-gray-700 text-lg"
          />
        </div>
        <div className="mb-4 flex flex-col">
          <label htmlFor="email">confirm password</label>
          <input
            {...passwordConfirm}
            className="input-sm rounded-sm border border-gray-700 text-lg"
          />
        </div>
        <button className="btn self-end border-0 bg-green-200 text-lg normal-case text-green-900">
          Change Password
        </button>
      </form>
    </div>
  );
};

export default Password;
