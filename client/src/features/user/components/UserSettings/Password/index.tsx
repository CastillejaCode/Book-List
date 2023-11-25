import auth from "src/auth/config";
import { updatePassword, signOut } from "firebase/auth";
import { useField } from "src/hooks/useField";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch } from "react-redux";
import { setToast } from "src/slices/toastSlice";
import Toast from "src/components/ui/Toast";

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
    try {
      if (passwordConfirm.value !== password.value)
        throw Error("Passwords do not match");

      await updatePassword(user, password.value);
      setPassword("");
      setPasswordConfirm("");
      signOut(auth);
      dispatch(setToast({ message: "Password reset" }));
    } catch (error) {
      if (error instanceof Error)
        dispatch(setToast({ type: "error", message: error.message }));
      setPassword("");
      setPasswordConfirm("");
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h2>
        Reset your password. <br /> You will then be signed out.
      </h2>
      <Toast />
      <form className="flex w-full flex-col gap-6 p-0" onSubmit={resetPassword}>
        <label className="flex flex-col">
          Password
          <input
            {...password}
            autoComplete="new-password"
            className="input-login"
          />
        </label>
        <label className="mb-4 flex flex-col">
          Confirm password
          <input
            {...passwordConfirm}
            autoComplete="new-password"
            className="input-login"
          />
        </label>
        <button className="btn self-end  bg-green-200 text-green-900">
          Change Password
        </button>
      </form>
    </div>
  );
};

export default Password;
