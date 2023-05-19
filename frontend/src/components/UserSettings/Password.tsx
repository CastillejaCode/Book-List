import auth from "../../auth/config";
import { updatePassword, signOut } from "firebase/auth";
import { useField } from "../../hooks/useField";

const Password = () => {
  const { setValue: setPasswordValue, ...password } = useField("pwd", "pwd");

  const resetPassword = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const user = auth.currentUser;
    if (!user) return;
    if (event.target.pwdconfirm.value != password.value)
      throw new Error("Passwords do not match");
    updatePassword(user, password.value)
      .then(() => {
        signOut(auth);
      })
      .catch((error) => {
        console.log(error.code);
      });
  };

  return (
    <div className="flex w-fit flex-col items-center gap-4">
      <div className="w-full">
        <h2>Reset your password here.</h2>
        <h2>You will be then be signed out.</h2>
      </div>
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
            className="input-sm rounded-sm border border-gray-700 text-lg"
            name="pwdconfirm"
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
