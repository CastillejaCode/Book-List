import { signOut, updatePassword } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch } from "react-redux";
import auth from "src/auth/config";
import { useField } from "src/hooks/useField";
import { setToast } from "src/slices/toastSlice";

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
    <div className="flex flex-col  gap-4">
      <h2>
        Reset your password. <br /> You will be signed out.
      </h2>
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
        <button
          className="btn self-end  bg-green-200 text-green-900"
          disabled={Boolean(user?.isAnonymous)}
        >
          {user?.isAnonymous ? "No Account" : "Change Password"}
        </button>
      </form>
    </div>
  );
};

export default Password;
